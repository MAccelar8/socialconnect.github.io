import { Component, OnInit, ViewChild } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { LoaderService } from "src/app/services/loader.service";
import { UserService } from "src/app/services/user.service";

const SERVERS: any = {
  iceServers: [
    { urls: "stun:stun.services.mozilla.com" },
    { urls: "stun:stun.l.google.com:19302" }
  ]
};

const DEFAULT_CONSTRAINTS = {
  optional: []
};

declare let RTCPeerConnection: any;
@Component({
  selector: "app-chat-area",
  templateUrl: "./chat-area.component.html",
  styleUrls: ["./chat-area.component.scss"]
})
export class ChatAreaComponent implements OnInit {
  @ViewChild("chatSpace", { static: true }) myScrollContainer: any;
  @ViewChild("videoElement", { static: true }) videoElement: any;
  video: any;
  user: any; // currently logged in user
  currentUser: any; //chat area of this user
  message: string; //used for retrieving message from text-area
  messages = []; // used to store messages from DB and display
  showEmojiPicker = false; //for Toggling of EmojiPicker
  onlineStatus: any; //checks online status of the currentUser
  typingStatus: any;
  pc: any;

  constructor(
    private chatservice: ChatService,
    private loader: LoaderService,
    private userservice: UserService
  ) {}

  //scrolling down when component is initialized and after DOM is rendered
  ngAfterViewInit() {
    this.scrollToBottom();
  }

  // Scrolling down when new message is sent or recieved
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    // this.video = this.videoElement.nativeElement;
    // this.setupWebRtc();
    this.typingStatus = 0;
    this.loader.show();
    this.message = "";
    this.user = JSON.parse(localStorage.getItem("user"));

    this.chatservice.recieveMessagefromRoom().subscribe((data: any) => {
      console.log("RECIEVEMESSAGEFROMROOM :");
      console.log(data);
      if (data.room == this.currentUser.personalRoomID) {
        //updating messages array
        this.messages.push(data);
        if (data.recieverId == this.user.uid) {
          this.chatservice.sendReadNotify(data);
        }
      }
    });

    this.chatservice.getReadMessageNotify().subscribe((data: any) => {
      console.log("GET__MESSAGE_ACK");
      console.log(data);
      var index = this.messages.findIndex(d => d.time == data.time);
      console.log("Found messages is");
      console.log(this.messages[index]);
      this.messages[index].status = 2;
      console.log(this.messages[index]);
    });

    this.chatservice.getOfflineNotify().subscribe(data => {
      console.log("GETOFFLINE NOTIFY IN CHAT_AREA");
      console.log(data);
      if (data.uid == this.currentUser.uid) {
        console.log("This is the correct user");
        if (data.status) {
          this.onlineStatus = 1;
        } else {
          this.onlineStatus = 0;
        }

        this.chatservice
          .getAllMessagesfromCurrentRoom(this.currentUser.personalRoomID)
          .subscribe((data: any) => {
            console.log(
              "FROM getOFFLINENOTIFY METHOD GETALLMESSAGES FROM ROOM METHOD"
            );
            // console.log(data);
            this.messages = data.message;
            // this.loader.hide();
          });
      }
    });

    /**
     * listens to change in selected user in friends-chat-list component
     * sets current user to that user
     */
    this.chatservice.obs$.subscribe((data: any) => {
      console.log("Inside chat-area");
      console.log(data);

      //Setting the clicked user data to currentUser
      this.currentUser = data;

      this.userservice
        .checkUserOnlineStatus(data.uid)
        .subscribe((data: any) => {
          this.onlineStatus = data.status;
          console.log(data);
        });

      this.chatservice.sendAllRead(data.uid, data.personalRoomID);

      /**
       * getting all messages from the database whenever there is change in the currentUser
       */
      this.chatservice
        .getAllMessagesfromCurrentRoom(data.personalRoomID)
        .subscribe((data: any) => {
          console.log("FROM CHAT SERVICE GETALLMESSAGES FROM ROOM METHOD");
          console.log(data);
          this.messages = data.message;
          this.loader.hide();
        });
    });

    this.chatservice.recieveTypingStatus().subscribe((data: any) => {
      // console.log("recieve at component");
      // console.log(data)
      if (data.status) {
        this.typingStatus = 1;
        setTimeout(() => {
          this.typingStatus = 0;
        }, 5000);
      }
    });

    this.chatservice.getReadMessageAllNotify().subscribe((data: any) => {
      console.log("55555555555555555555555555555555");
      console.log(data);

      if (this.currentUser.personalRoomID == data.room) {
        /**
         * getting all messages from the database whenever there is change in the currentUser
         */
        this.chatservice
          .getAllMessagesfromCurrentRoom(data.room)
          .subscribe((data: any) => {
            console.log("FROM CHAT SERVICE GETALLMESSAGES FROM ROOM METHOD");
            console.log(data);
            this.messages = data.message;
            this.loader.hide();
          });
      }
    });

    this.chatservice.recieveVideoCallRequest().subscribe((message:any)=>{
      console.log("VIDEO CALL REQUEST RECIEVED WITH MESSAGE_______________");
      console.log(message);
      if(message.offer){
        const peerConnection = new RTCPeerConnection(SERVERS, DEFAULT_CONSTRAINTS);
        peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
        peerConnection.createAnswer().then((answer)=>{
          console.log("ANSWER IS _____________________")
          console.log(answer);

          this.chatservice.sendvideocallanswer(answer , this.currentUser.uid);

          peerConnection.addEventListener('icecandidate', event => {
            if (event.candidate) {
               console.log("EVENT CANDIDATE FOUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            }
        });
        })
      }
    });

  
  }

  sendMessagetoRoom() {
    // console.log("The Message was: ", this.message);

    //checking if text-area contains atleast some character other than whitespaces
    var regex = /./;
    var status = 0;
    console.log("===============");
    if (this.onlineStatus) {
      status = 1;
    }

    console.log(this.onlineStatus);
    console.log(status);
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
          this.user.uid,
          this.currentUser.uid,
          status
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
   * Emit event for user typing
   */
  userTyping() {
    // console.log("send in component")
    this.chatservice.sendTypingStatus(
      this.currentUser.uid,
      this.currentUser.personalRoomID
    );
  }

  /**
   * fileupload buttom is clicked
   * @param event occured event details
   */
  fileUpload(event) {
    console.log(event);
  }

  /**
   * toggle Emoji picker
   */
  toggleEmojiPicker() {
    console.log("Toggle selected");
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    console.log(event);
    const { message } = this;
    console.log(message);
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    console.log(message);
    this.showEmojiPicker = false;
  }

  sound() {
    console.log("clicked Sound");
    this.initCamera({ video: true, audio: true });
    this.setupWebRtc();
  }

  async setupWebRtc()  {
    console.log("SETTING UP WEBRTC")
    this.pc = new RTCPeerConnection(SERVERS, DEFAULT_CONSTRAINTS);
    console.log(this.pc)
    const offer = await this.pc.createOffer();
    console.log("GETTING OFFER")
    console.log(offer);
    this.pc.setLocalDescription(offer);
    this.pc.addEventListener('icecandidate', event => {
      if (event.candidate) {
         console.log("EVENT CANDIDATE FOUND2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      }
  });
    this.chatservice.recieveVideoCallAnswer().subscribe(async (message:any)=>{
      console.log("ANSWER IS RECIEVEF");
      console.log(message);
      const remoteDesc = new RTCSessionDescription(message.answer);
      await this.pc.setRemoteDescription(remoteDesc);
    })
    this.initCamera({ video: true, audio: true });

    this.chatservice.sendvideocall(offer , this.currentUser.uid)
    
  }

  initCamera(config: any) {
    var browser = <any>navigator;

    browser.getUserMedia =
      browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia;

    console.log(browser);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      console.log(stream);
      const mediaStream = new MediaStream(stream);
      console.log(this.video.srcObject);
      // this.video.src = mediaStream;
      // const video1 = document.getElementById('videoElement');
      // video1.sr
      this.video.srcObject = stream;
      this.video.play();
    });
  }
}
