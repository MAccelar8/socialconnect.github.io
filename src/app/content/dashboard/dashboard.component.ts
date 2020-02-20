import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../pre-auth/shared/services/auth.service";
import * as $ from "jquery";
import { UserService } from "src/app/services/user.service";
import { ChatService } from "src/app/services/chat.service";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  username: String = "";
  notCount: number = 0;
  notifications = [];
  users: any = [];
  constructor(
    public authservice: AuthService,
    private userservice: UserService,
    private chatService: ChatService
  ) {}
  ngOnInit() {

    console.log("DASHBOARD ONINIT")
    this.chatService.connectSocket();

    this.users = [];
    this.username = this.userservice.getUserName();

    /**
     * Gets Number of Users for displaying in Badge on header for the first time
     */
    this.userservice.getNumberOfUsersWithFriendRequest();
  }
  /**
   *  subscribes to Friend Request Recieved Event
   *  And then Gets updated Number of Users for displaying in Badge on header
   */
  subscribeToFriendRequestRecieved() {
    this.chatService.recieveFriendRequests().subscribe((data: any) => {
      this.userservice.getNumberOfUsersWithFriendRequest();
    });
  }

  signOut(){
    this.chatService.disconnectFromRoom();
    this.authservice.SignOut();
  }


  
  /**
   * Jquery for Opening and Closing of sidebar 
   */
  sidebar_open() {
    $(".sidebar").css("left", "0");
    $("#body-wrap").addClass("body-wrapper");
    $("wrapper").css("overflow", "hidden");
    console.log("hasodjas");
  }
  sidebar_close() {
    $("#body-wrap").removeClass("body-wrapper");
    $(".sidebar").css("left", "-350px");
    $("wrapper").css("overflow", "auto");
  }
}
