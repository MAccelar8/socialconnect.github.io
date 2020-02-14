import { Component, OnInit, ViewChild } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: "app-chat-area",
  templateUrl: "./chat-area.component.html",
  styleUrls: ["./chat-area.component.scss"]
})
export class ChatAreaComponent implements OnInit {
  @ViewChild("chatSpace", { static: true }) myScrollContainer: any;
  user: any; // currently logged in user
  currentUser: any; //chat area of this user
  message: string; //used for retrieving message from text-area
  messages = []; // used to store messages from DB and display
  showEmojiPicker = false; //for Toggling of EmojiPicker
  constructor(private chatservice: ChatService , private loader : LoaderService) {
    /**
     * listens to change in selected user in friends-chat-list component
     * sets current user to that user
     */
    this.chatservice.obs$.subscribe((data: any) => {
      // console.log("Inside chat-area");
      // console.log(data);

      //Setting the clicked user data to currentUser
      this.currentUser = data;
      /**
       * Joining the same room as clicked friend does
       */
      this.chatservice.createRoom(data.personalRoomID);

      /**
       * getting all messages from the database whenever there is change in the currentUser
       */
      this.chatservice
        .getAllMessagesfromCurrentRoom(data.personalRoomID)
        .subscribe((data: any) => {
          // console.log("FROM CHAT SERVICE GETALLMESSAGES FROM ROOM METHOD");
          // console.log(data);
          this.messages = data.message;
          this.loader.hide();
        });
    });

    this.chatservice.recieveMessagefromRoom().subscribe((data: any) => {
      // console.log("RECIEVEMESSAGEFROMROOM :");
      // console.log(data);

      //updating messages array
      this.messages.push(data);
    });
  }

  //scrolling down when component is initialized and after DOM is rendered
  ngAfterViewInit() {
    this.scrollToBottom();
  }

  // Scrolling down when new message is sent or recieved
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.loader.show();
    this.message = "";
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  sendMessagetoRoom() {
    // console.log("The Message was: ", this.message);


    //checking if text-area contains atleast some character other than whitespaces
    var regex = /./;
    if (regex.test(this.message)) {

      // Removing the last /n used to submit from the message
      var messagewithoutlastenter = this.message.replace(/\n$/, "");
      if (messagewithoutlastenter != "") {

        /**
         * sending message to chatservice to back-end with current date
         */
        this.chatservice.sendMessage(
          messagewithoutlastenter,
          this.currentUser.personalRoomID,
          this.user.displayName,
          Date.now(),
          this.user.uid
        );
      }
    }

    //clearing the text-area after message submit
    this.message = "";
  }


  //Logic to scroll to bottom
  scrollToBottom(): void {
    try {
      let z = document.getElementById("chatarea");
      let zz = document.getElementById("conversation");
      zz.scrollTop = z.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * toggle Emoji picker
   */
  toggleEmojiPicker(){
    console.log("Toggle selected");
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    console.log(event)
    const { message } = this;
    console.log(message)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    console.log(message)
    this.showEmojiPicker = false;
  }
}
