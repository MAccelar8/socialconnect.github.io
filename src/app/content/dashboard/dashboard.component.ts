import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pre-auth/shared/services/auth.service';
import * as $ from 'jquery';
import { UserService } from 'src/app/user.service';
import { ChatService } from 'src/app/chat.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username:String = '';
  notCount: number = 0;
  notifications = [];
  users: any = [];
  constructor(public authservice : AuthService, private userservice : UserService , private chatService : ChatService) { 
    
    this.chatService.recieveFriendRequests().subscribe((data:any)=>{

      this.userservice.getAllNotifications().subscribe((data:any)=>{
        console.log('get all notification from dashboard')
        console.log(data)
        console.log("==================================")
        
        if(localStorage.getItem('notification')!=''){
          console.log(JSON.parse(localStorage.getItem('notification')).length);
          this.notCount = data.message.length
        }else{
          console.log("LOCAL STORAGE IS NULL")
          this.notCount = 0 
        }
      })


      this.chatService.acceptFriendRequestsNotify().subscribe(data=>{
        console.log(data)
        if(localStorage.getItem('notification')!=''){
          console.log(JSON.parse(localStorage.getItem('notification')).length);
          this.notCount = JSON.parse(localStorage.getItem('notification')).length
        }else{
          console.log("LOCAL STORAGE IS NULL")
          this.notCount = 0 
        }
        
      })
      // console.log("asdfsdfs")
      // console.log(this.notCount)
      // if(!this.notifications.includes(data.uid)){
      //   this.notifications.push(data.uid)
      //   localStorage.setItem('notification', JSON.stringify(this.notifications))
      //   this.notCount += 1;
      // }
      // console.log("notification array status")
      // console.log(this.notifications)
      // this.userservice.getUserInfo(data.uid);
      
    })
  }
  ngOnInit() {
    this.users = [];
    this.username = this.userservice.getUserName();
    // this.userservice.testMethod();
    console.log("==================================")
    // if(localStorage.getItem('notification')!=''){
    //   console.log(localStorage.getItem('notification'))
    //   console.log(JSON.parse(localStorage.getItem('notification')).length);
    //   this.notCount = JSON.parse(localStorage.getItem('notification')).length
    // }else{
    //   console.log("LOCAL STORAGE IS NULL")
    //   this.notCount = 0
    // }
    // this.userservice.getAllNotifications().subscribe((data:any)=>{
    //   console.log('get all notification from dashboard')
    //   console.log(data)
    //   if(data.status){
    //     console.log("Inside true Status")
    //     console.log(data.message)
    //     localStorage.setItem('notification' , JSON.stringify(data.message));
    //   }else{
    //     localStorage.setItem('notification' , '');
    //   }
    //   // console.log(localStorage.setItem('notification' , JSON.stringify(data)));
    // })

    this.userservice.getAllNotifications().subscribe((data: any) => {
      console.log("get all notification in Oninit of dashboard component");
      console.log(data);

      if (data.status) {
        data.message.forEach(async element => {
          console.log("an user");
          var response = this.userservice
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
                this.users.push({
                  uid: data.message.uid,
                  displayName: data.message.displayName,
                  profilePicURL: picURL
                });
                console.log(this.users)
                console.log(this.users);
                localStorage.setItem('notification' , JSON.stringify(this.users));
                this.notCount = JSON.parse(localStorage.getItem('notification')).length
              } else {
                console.log("No data");
                localStorage.setItem('notification' , '');
                this.notCount = 0
              }
            });
        });
      }else{
        localStorage.setItem('notification' , '');
        this.notCount = 0
        console.log(this.users.length)
      }
    });
  }

  

  sidebar_open(){
    $('.sidebar').css('left','0');
    $('#body-wrap').addClass('body-wrapper');
    $('wrapper').css('overflow','hidden');
    console.log("hasodjas")
  }
  sidebar_close(){
    $('#body-wrap').removeClass('body-wrapper');
        $('.sidebar').css('left','-350px');
        $('wrapper').css('overflow','auto')
  }

}
