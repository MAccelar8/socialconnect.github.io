import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-friends-display',
  templateUrl: './friends-display.component.html',
  styleUrls: ['./friends-display.component.scss']
})
export class FriendsDisplayComponent implements OnInit {
  friends = []
  constructor(private userServeice : UserService , private chatService : ChatService) { }

  ngOnInit() {

    /**
     * gets list of Users which are friends and Their other details
     */
    this.userServeice.getAllFriends().subscribe((data:any)=>{
      if(data.status){
        this.friends = this.addDetailsToEachUser(data.message , data.roomData)
      }else{
        console.log("No friends Found")
        this.friends = [];
      }
    })

    this.chatService.recieveDeleteFriendAcknowledgement().subscribe(data=>{
      if(data){
        this.userServeice.getAllFriends().subscribe((data:any)=>{
          if(data.status){
            this.friends = this.addDetailsToEachUser(data.message , data.roomData)
          }else{
            console.log("No friends Found")
            this.friends = [];
          }
        })
      }
    })

    this.chatService.acceptFriendRequestsNotify().subscribe(data=>{
      if(data){
        this.userServeice.getAllFriends().subscribe((data:any)=>{
          if(data.status){
            this.friends = this.addDetailsToEachUser(data.message , data.roomData)
          }else{
            console.log("No friends Found")
            this.friends = [];
          }
        })
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
      console.log("Each Friend Object in ForLOOP")
      console.log(friend)
      var temp = roomData.findIndex( d => d.uid == friend.uid);
      Object.assign(friend , {personalRoomID : roomData[temp].personalRoomID , timestamp : roomData[temp].timestamp});
      console.log("FRIEND AFTER")
      console.log(friend)
      TempFriends.push(friend)
    });

    return TempFriends
  }


  deleteFriendButtonClicked(event){
    console.log('Button Clicked');
    console.log(event.target.value);
    this.userServeice.deleteFriends(event.target.value).subscribe((data:any)=>{
      console.log("response from delete Friends")
      if(data.status){
        this.userServeice.getAllFriends().subscribe((data:any)=>{
          if(data.status){
            this.friends = this.addDetailsToEachUser(data.message , data.roomData)
          }else{
            console.log("No friends Found")
            this.friends = [];
          }
        })
      }
    })
  }

}
