import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'social-connect';
  private url = "http://localhost:3000";
  private socket;
  constructor(){
  
  }

  // ngOnInit(){
    // console.log("++++++++++_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_")
    // this.socket = io(this.url, {
    //   query: "uid=" + JSON.parse(localStorage.getItem("user")).uid.toString()
    // });
    // console.log("Socket is:");
    // console.log(this.socket);
  // }
}

