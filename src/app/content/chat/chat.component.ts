import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user:any;
  messages:{message:string,user:string}[] = []
  message:String;
  constructor(private chatService: ChatService) { 
    // this.chatService.recieveMessagefromRoom()
    // .subscribe((data:any)=>{
    //   console.log(data)
    //   this.messages.push({message:data.message, user:data.displayname})
    // })
  }
  ngOnInit() {
   
    // this.user= JSON.parse(localStorage.getItem('user'));
    // console.log(this.user.displayName)
  }

  

  

}
