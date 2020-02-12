import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"]
})
export class NotificationsComponent implements OnInit {
  notifications = [];
  users = [];
  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {


     /**
     * Listening to friend Request Successfully accepted
     * refreshing User List and Number of Users Request on Header Badge
     */
    this.chatService.acceptFriendRequestsNotify().subscribe(data=>{
      this.userService.getAllUsersWithFriendRequest().subscribe((data:any)=>{
        console.log("NOTIFICATION COMPONENT ===> RECIEVE_FRIEND_REQ ====> GET_ALL_USERS_WITH_FRIENDREQUESTS")
        if(data.status){
          this.users = data.message;
        }else{
          this.users = []
        }
        this.userService.getNumberOfUsersWithFriendRequest();
      })

    //   console.log("Frend Req accepted Acknowledgement");
    //   console.log(data)
    //   console.log(this.users)
    //   var index = this.users.findIndex(p => p.uid == data.uid);
    //   console.log("index found is : ",index)
    //  console.log(this.users)
    //  var newUser =  this.users.splice(index , 1);
    //  console.log(newUser)
    //  this.users = newUser;
    //  this.userService.getNumberOfUsersWithFriendRequest();

    })

    /**
     * Recieve friend Request from another User
     * refreshing User List and Number of Users Request on Header Badge
     */
    this.chatService.recieveFriendRequests().subscribe((data:any)=>{
      this.userService.getAllUsersWithFriendRequest().subscribe((data:any)=>{
        console.log("NOTIFICATION COMPONENT ===> RECIEVE_FRIEND_REQ ====> GET_ALL_USERS_WITH_FRIENDREQUESTS")
        if(data.status){
          this.users = data.message;
        }else{
          this.users = []
        }
        this.userService.getNumberOfUsersWithFriendRequest();
      })
    });

    /**
     * Deleted Friend Request Sucessfully
     * refreshing User List and Number of Users Request on Header Badge
     */
    this.chatService.recieveDeleteFriendAcknowledgement().subscribe((data:any)=>{
      this.userService.getAllUsersWithFriendRequest().subscribe((data:any)=>{
        console.log("NOTIFICATION COMPONENT ===> RECIEVED_DELETE_FRIEND_ACK ====> GET_ALL_USERS_WITH_FRIENDREQUESTS")
        if(data.status){
          this.users = data.message;
        }else{
          this.users = []
        }
        this.userService.getNumberOfUsersWithFriendRequest();
      })
    })

  }



  ngOnInit() {
    console.log("On Init of notification component");
    /**
     * Getting Users Who has sent Friend Request for the first time
     */
    this.userService.getAllUsersWithFriendRequest().subscribe((data:any)=>{
      console.log("NOTIFICATION COMPONENT ===> GET_ALL_USERS_WITH_FRIENDREQUESTS")
      if(data.status){
        this.users = data.message;
      }else{
        this.users = []
      }
    })

  }
  
  deleteRequestButtonClicked(event){
    console.log(event.target.value)
    this.chatService.deleteFriendRequest(event.target.value);

  }

  acceptRequestButtonClicked(event){
    // console.log(event.target.value)
    this.chatService.acceptFriendRequest(event.target.value);
  }
}
