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


    // this.chatService.getReadMessageAllNotify().subscribe((data:any)=>{
    //   var index = this.friends.findIndex(d => d.uid == data.ackby)
    //   this.friends[index].unreadMessagesCount = 0;
    // });

    
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
        var sortedArray = this.sortArrayOnLatestArrival([...this.friends]);
        this.friends  = sortedArray;
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
      console.log("the messagge")
      console.log(data);
      console.log("the friends Array")
      console.log(this.friends);
      console.log("The curretn user")
      console.log(this.user);
      if((data.senderId != this.user.uid)){
        console.log(this.currentSelectedFriend)
        if(data.senderId != this.currentSelectedFriend.uid){
          var index = this.friends.findIndex(d => d.uid == data.senderId);
          console.log('index found is ' , index);
          this.friends[index].latestmessagetime = data.time;
          this.friends[index].latestmessage = data.message;
          this.friends[index].latestmessagesenderId = data.senderId;
         let newCount = this.friends[index].unreadMessagesCount + 1;
         this.friends[index].unreadMessagesCount = newCount;
        }
        console.log("new Friend object is :");
        console.log(this.friends)
       this.friends = this.sortArrayOnLatestArrival([...this.friends]);
       console.log("Friends array after sorting");
       console.log(this.friends);

      }
      else{
        var index = this.friends.findIndex(d => d.uid == data.recieverId);
        console.log('index found is ' , index);
        this.friends[index].latestmessagetime = data.time;
        this.friends[index].latestmessage = data.message;
        this.friends[index].latestmessagesenderId = data.senderId;
        console.log("new Friend object is :");
        console.log(this.friends)
       this.friends = this.sortArrayOnLatestArrival([...this.friends]);
       console.log("Friends array after sorting");
       console.log(this.friends);
      }
      // if((data.senderId != this.user.uid) && (data.senderId != this.currentSelectedFriend.uid)){
      
      //   var target = this.friends.find(obj => obj.uid == data.senderId)
      //   console.log(target);
      // }
    });
  }


  /**
   * Sorts friends array for displaying the friend with latest message at top of the list
   * @param array array to be sorted
   */
  sortArrayOnLatestArrival(array){
    var sortedarray =  array.sort((a , b) => {if(a.latestmessagetime < b.latestmessagetime){return 1}else{return -1} });
    console.log("SORTING OUTPUT");
    console.log(sortedarray);
    return sortedarray;
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
  var index = this.friends.findIndex(d => d.uid == data.uid);
      this.friends[index].unreadMessagesCount = 0;
  this.chatService.changeChatPerson(data);
}

}
