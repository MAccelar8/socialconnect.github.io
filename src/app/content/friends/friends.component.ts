import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { ChatService } from "src/app/services/chat.service";
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"]
})
export class FriendsComponent implements OnInit {
  users: any = [];
  currentUser: any;
  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private loader : LoaderService,
  ) {

    /**
     * Listening to Friend Request Rejection Event
     * Updating Users based on that
     */
    this.chatService
      .rejectedFriendRequestNotification()
      .subscribe((data: any) => {
        console.log("FRIENDS_COMPONENT ==> REJECTED_FRIEND_REQ_NOTFY");
        console.log(data);
        this.userService.getAllUsers().subscribe((data: any) => {
          this.users = data.message;
          console.log(this.users);
        });
      });

    /**
     * Acknowlegment of Added Friend Sucessfully
     * refreshing the users array by calling getAllusers()
     */
    this.chatService.recieveAddFriendAcknowledgement().subscribe(data => {
      console.log("FRIENDS_COMPONENT ==> ADDFRIEND_ACK");
      this.userService.getAllUsers().subscribe((data: any) => {
        this.users = data.message;
        console.log(this.users);
      });
    });

    this.chatService.acceptFriendRequestsNotify().subscribe(data=>{
      if(data){
        this.userService.getAllUsers().subscribe((data: any) => {
          this.users = data.message;
          console.log(this.users);
        });
      }
    })


    this.chatService.recieveDeleteFriendAcknowledgement().subscribe(data=>{
      if(data){
        this.userService.getAllUsers().subscribe((data: any) => {
          this.users = data.message;
          console.log(this.users);
        });
      }
    })
  }

  ngOnInit() {

    this.loader.show('Get all Friends')
    /**
     * Getting all users from API for First Time
     */
    console.log("On Init Of FRIENDS COMPONENT")
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data.message;
      console.log(this.users);

      this.loader.hide();
    });
  }


  /**
   * Executed in Add Friend Button Click
   * Emmiting add Friend Event in chat service
   */
  addFriendButtonClicked(data) {
    console.log("Add friend Button Clicked");
    console.log(data.target.value);
    this.chatService.sendFriendRequest(data.target.value);
  }
}
