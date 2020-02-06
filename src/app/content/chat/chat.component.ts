import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
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
    // this.messages.push({message:"hello",user:"SuperUser"})
    this.chatService.recieveMessagefromRoom()
    .subscribe((data:any)=>{
      console.log(data)
      this.messages.push({message:data.message, user:data.displayname})
    })
  }
  ngOnInit() {
    this.chatService.createRoom();
    this.user= JSON.parse(localStorage.getItem('user'));
    console.log(this.user.displayName)
  }

  sendMessagetoRoom(){
    this.chatService.sendMessage(this.message, this.user.displayName );
    this.message = '';
  }

  

}
