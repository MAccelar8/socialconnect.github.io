import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji'
import { database } from 'firebase';

@Component({
  selector: 'app-friends-chat-list',
  templateUrl: './friends-chat-list.component.html',
  styleUrls: ['./friends-chat-list.component.scss']
})
export class FriendsChatListComponent implements OnInit {
  friends: any = [];
  user : any;
  currentSelectedFriend:any;
  constructor( private userService: UserService,
    private chatService: ChatService) { 
      
    }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));

    
     /**
     * gets list of Users which are friends and Their other details
     */
    this.userService.getAllFriends().subscribe((data:any)=>{
      if(data.status){
        console.log("=============================");
        console.log(data)
        this.friends = data.message;
        console.log(this.friends)
        this.addFriendsToRoom(this.friends);
        // console.log("INSIDE GET ALL FRIENDS")
        this.onFriendClick(this.friends[0]);
        this.currentSelectedFriend = this.friends[0];

      }else{
        console.log("No friends Found")
        this.friends = [];
      }
    })


    this.chatService.recieveMessagefromRoom().subscribe((data:any)=>{
      console.log("0000000000000000000000");
      console.log(data);
      console.log(this.friends);
      console.log(this.user);
      if(data.senderId != this.user.uid){
        var index = this.friends.findIndex(d => d.uid == data.senderId);
        console.log('index found is ' , index);
       let newCount = this.friends[index].unreadMessagesCount + 1;
       this.friends[index].unreadMessagesCount = newCount;
      }
      // if((data.senderId != this.user.uid) && (data.senderId != this.currentSelectedFriend.uid)){
      
      //   var target = this.friends.find(obj => obj.uid == data.senderId)
      //   console.log(target);
      // }
    });
  }


  
 addFriendsToRoom(friends){
  friends.forEach(friend => {
    this.chatService.createRoom(friend.personalRoomID);
  });
}

onFriendClick(data){
  console.log(data)
  this.currentSelectedFriend = data;
  console.log("Friend is clicked")
  this.chatService.changeChatPerson(data);
}

}
