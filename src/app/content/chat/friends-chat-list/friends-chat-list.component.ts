import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji'

@Component({
  selector: 'app-friends-chat-list',
  templateUrl: './friends-chat-list.component.html',
  styleUrls: ['./friends-chat-list.component.scss']
})
export class FriendsChatListComponent implements OnInit {
  friends: any = [];
  currentSelectedFriend:any;
  constructor( private userService: UserService,
    private chatService: ChatService) { 
      
    }

  ngOnInit() {

    
     /**
     * gets list of Users which are friends and Their other details
     */
    this.userService.getAllFriends().subscribe((data:any)=>{
      if(data.status){
        this.friends = this.addDetailsToEachUser(data.message , data.roomData);
        this.onFriendClick(this.friends[0]);
        this.currentSelectedFriend = this.friends[0];

      }else{
        console.log("No friends Found")
        this.friends = [];
      }
    })
  }


  /**
  * map every user in Users with uid of RoomData and make a single array of friends
  * Adding other details like personalRoomID and timestamp
  * @param users It is an array of Users with all details
  * @param roomData It is array of Objects which incude properties like personalRoomID,timestamp,uid for every user
  */
 addDetailsToEachUser(users , roomData){
  var TempFriends = []
  users.forEach(friend => {
    // console.log("Each Friend Object in ForLOOP")
    // console.log(friend)
    var temp = roomData.findIndex( d => d.uid == friend.uid);
    Object.assign(friend , {personalRoomID : roomData[temp].personalRoomID , timestamp : roomData[temp].timestamp});
    // console.log("FRIEND AFTER")
    // console.log(friend)
    TempFriends.push(friend)
  });

  return TempFriends
}

onFriendClick(data){
  console.log(data)
  this.currentSelectedFriend = data;
  console.log("Friend is clicked")
  this.chatService.changeChatPerson(data)
}

}
