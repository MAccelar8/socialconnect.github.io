import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-friends-display',
  templateUrl: './friends-display.component.html',
  styleUrls: ['./friends-display.component.scss']
})
export class FriendsDisplayComponent implements OnInit {
  friends = []
  constructor(private userServeice : UserService) { }

  ngOnInit() {
    this.userServeice.getAllFriends().subscribe((data:any)=>{
      if(data.status){
        console.log(data.message);

        var tempfriends: any[] = data.message;
        var details : any[] = data.roomData;
        tempfriends.forEach(friend => {
          console.log("object")
          console.log(friend)
          var temp = details.findIndex( d => d.uid == friend.uid);
          Object.assign(friend , {personalRoomID : details[temp].personalRoomID , timestamp : details[temp].timestamp});
          console.log("FRIEND AFTER")
          console.log(friend)
          this.friends.push(friend)
        });
        // this.friends = data.message
      }else{
        console.log("No friends Found")
      }
    })
  }

}
