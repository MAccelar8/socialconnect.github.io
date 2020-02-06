import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/chat.service";
import { UserService } from "src/app/user.service";
import { async } from "@angular/core/testing";

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
    this.chatService.acceptFriendRequestsNotify().subscribe(data=>{
      console.log("Frend Req accepted Acknowledgement");
      // console.log(data)
      // console.log(this.users)
      var index = this.users.findIndex(p => p.uid == data.uid);
      console.log("index found is : ",index)
     
     var newUser =  this.users.splice(index , 1)

     localStorage.setItem('notification' , JSON.stringify(newUser));

    })
    this.chatService.recieveFriendRequests().subscribe((data:any)=>{
      this.userService.getAllNotifications().subscribe((data: any) => {
        console.log("get all notification");
        console.log(data);
  
        if (data.status) {
          data.message.forEach(async element => {
            console.log("an user");
            var response = this.userService
              .getUserInfobyID(element.fromUID)
              .subscribe((data: any) => {
                console.log("getUserbyID response");
                console.log(data.message);
                if (data.status) {
                  var picURL;
                  if (data.message.profilePicURL) {
                    picURL = data.message.profilePicURL;
                  } else if (data.message.photoURL) {
                    picURL = data.message.photoURL;
                  } else {
                    picURL = "../../../assets/Images/user_default.png";
                  }
                  var repeat = 1;
                  this.users.forEach(doc=>{
                    if(doc.uid == data.message.uid){
                      repeat = 0;
                    }
                  })
                  if(repeat){
                    this.users.push({
                      uid: data.message.uid,
                      displayName: data.message.displayName,
                      profilePicURL: picURL,
                    });
                  }
  
                  console.log(this.users);
                  localStorage.setItem('notification' , JSON.stringify(this.users))

                } else {
                  console.log("No data");
                  localStorage.setItem('notification' , JSON.stringify(this.users))
                }
              });
          });
        }else{
          console.log(this.users.length)
        }
      });
    });

  }

  ngOnInit() {
    // this.notifications = JSON.parse(localStorage.getItem("notification"));
    // console.log(this.notifications);
    console.log("On Init of notification component");
    console.log(localStorage.getItem('notification'))

    if(localStorage.getItem('notification')){
      var localusers = JSON.parse(localStorage.getItem('notification'));
      console.log("The Local users")
      console.log(localusers)
      this.users = [];
  
      localusers.forEach(localuser => {
        var picURL;
        if (localuser.profilePicURL) {
          picURL = localuser.profilePicURL;
        } else if (localuser.photoURL) {
          picURL = localuser.photoURL;
        } else {
          picURL = "../../../assets/Images/user_default.png";
        }
        // var repeat = 1;
        // this.users.forEach(doc=>{
        //   if(doc.uid == localuser.uid){
        //     repeat = 0;
        //   }
        // })
        if(1){
          this.users.push({
            uid: localuser.uid,
            displayName: localuser.displayName,
            profilePicURL: picURL
          });
        }
      });
    }else{
      this.users = [];
    }
  
    //               console.log(this.users);

    // this.userService.getAllNotifications().subscribe((data: any) => {
    //   console.log("get all notification");
    //   console.log(data);

    //   if (data.status) {
    //     data.message.forEach(async element => {
    //       console.log("an user");
    //       var response = this.userService
    //         .getUserInfobyID(element.fromUID)
    //         .subscribe((data: any) => {
    //           console.log("getUserbyID response");
    //           console.log(data.message);
    //           if (data.status) {
    //             var picURL;
    //             if (data.message.profilePicURL) {
    //               picURL = data.message.profilePicURL;
    //             } else if (data.message.photoURL) {
    //               picURL = data.message.photoURL;
    //             } else {
    //               picURL = "../../../assets/Images/user_default.png";
    //             }
    //             this.users.push({
    //               uid: data.message.uid,
    //               displayName: data.message.displayName,
    //               profilePicURL: picURL
    //             });

    //             console.log(this.users);
    //           } else {
    //             console.log("No data");
    //           }
    //         });
    //     });
    //   }else{
    //     console.log(this.users.length)
    //   }
    // });

    // this.userService.getUserInfo(this.notifications).subscribe((data:any)=>{
    //   console.log(data.message)
    // })
    // console.log("got response")
  }

  deleteRequestButtonClicked(event){
    console.log(event.target.value)
  }

  acceptRequestButtonClicked(event){
    console.log(event.target.value)

    this.chatService.acceptFriendRequest(event.target.value);

  }
}
