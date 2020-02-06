import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  users:any = [];
  currentUser: any;
  constructor(private userService : UserService, private chatService: ChatService) { 
    this.chatService.recieveAddFriendAcknowledgement().subscribe(data=>{
      console.log("ACKNOWLEDGEMENT DATA")
      console.log(data);
      var index = this.users.findIndex(p => p.uid == data.uid);
      console.log("index found is : ",index)
      console.log(this.users[index])
      
    })
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.userService.getAllUsers().subscribe((data:any)=>{
      // console.log(data);
      this.users = data.message;
      console.log(this.users)
    })
  }

  addFriendButtonClicked(data){
    console.log(data.target.value)

    this.chatService.sendFriendRequest(data.target.value);
  }

  

}
