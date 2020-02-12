import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";

@Component({
  selector: "app-chat-area",
  templateUrl: "./chat-area.component.html",
  styleUrls: ["./chat-area.component.scss"]
})
export class ChatAreaComponent implements OnInit {
  @ViewChild('chatSpace',{static: true }) myScrollContainer: any;
  user:any;
  currentUser: any;
  message: string;
  messages = [];
  constructor(private chatservice: ChatService) {



    /**
     * listens to change in selected user in friends-chat-list component
     * sets current user to that user
     */
    this.chatservice.obs$.subscribe((data: any) => {
      console.log("Inside chat-area");
      console.log(data);
      this.currentUser = data;
      this.chatservice.createRoom(data.personalRoomID);
      this.chatservice
        .getAllMessagesfromCurrentRoom(data.personalRoomID)
        .subscribe((data: any) => {
          console.log("FROM CHAT SERVICE GETALLMESSAGES FROM ROOM METHOD");
          console.log(data);
          // var tempData = {
          //   username : data.message.displayName,
          //   message: data.message.message,
          //   time: data.message.time,
          // }

          // console.log(tempData)
          // this.messages = data;
          this.messages = data.message;
        });
    });

    this.chatservice.recieveMessagefromRoom().subscribe((data: any) => {
      console.log("RECIEVEMESSAGEFROMROOM :");
      console.log(data);

      this.messages.push(data);
    });
  }
  ngAfterViewInit() {        
    this.scrollToBottom();        
} 
ngAfterViewChecked() {        
  this.scrollToBottom();        
} 
scrollToBottom(): void {
    try {
      // console.log("LDHFJLAHDFLKADKLASJDLKASJFKLAJSFLJ");
      // console.log("Before " , this.myScrollContainer.nativeElement);
        // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        // this.myScrollContainer.nativeElement.offsetTop('500');
        let z = document.getElementById('chatarea');
        console.log(z);
        console.log("scroll height" +z.scrollHeight);
        let zz = document.getElementById('conversation');
        zz.scrollTop = z.scrollHeight;
        // console.log("After " , this.myScrollContainer.nativeElement.scrollTop);
    } catch(err) { 
      console.log(err)
    }                 
}
  ngOnInit() {
    // this.scrollToBottom();
    this.message = "";
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  // ngAfterViewInit() {
  //   this.container = document.getElementById("chat-space");
  //   console.log("inside chat space");
  //   console.log(this.container.scrollHeight);
  //   this.container.scrollTop = this.container.scrollHeight;
  // }

  sendMessagetoRoom() {
    // let d:Date = Date()
    // // console.log(d.toJS)
    // var time = d.getHours()+":"+d.getMinutes()+":"+
    // d.getSeconds()
    console.log("The Message was: ", this.message);

    var regex = /./;
    if (regex.test(this.message)) {
      var messagewithoutlastenter = this.message.replace(/\n$/, "");
      if (messagewithoutlastenter != "") {
        this.chatservice.sendMessage(
          messagewithoutlastenter,
          this.currentUser.personalRoomID,
          this.user.displayName,
          Date.now(),
          this.user.uid
        );
      }
    }

    // this.messages.push({
    //   username: this.user.displayName,
    //   message: this.message
    // })

    this.message = "";
  }
}
