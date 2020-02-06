import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable, observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private url = "http://localhost:3000";
  private socket;
  constructor() {
    this.socket = io(this.url, {
      query: "uid=" + JSON.parse(localStorage.getItem("user")).uid.toString()
    });
    console.log("Socket is:");
    console.log(this.socket);
  }

  sendFriendRequest(uid: string) {
    this.socket.emit("send-friend-request", { uid });
  }

  acceptFriendRequest(uid: string){
    this.socket.emit("accept-friend-request", { uid });
  }
  sendMessage(message: String, name: String) {
    var data = {
      message: message,
      displayname: name
    };
    this.socket.emit("new-message", data);
  }

  createRoom() {
    this.socket.emit("create", "Room1");
  }

  recieveFriendRequests() {
    return Observable.create(observer => {
      this.socket.on("notification-recieved", message => {
        console.log("Notification Recieved");
        observer.next(message);
      });
    });
  }

  acceptFriendRequestsNotify() {
    return Observable.create(observer => {
      this.socket.on("accept-friend-notification-recieved", message => {
        console.log("Accept Friend Notification Recieved");
        observer.next(message);
      });
    });
  }

  recieveAddFriendAcknowledgement(){
    return Observable.create(observer => {
      this.socket.on("add-friend-request-sent", message => {
        console.log("Add Friend Acknowledgement Recieved");
        observer.next(message);
      });
    });
  }
  

  recieveMessagefromRoom() {
    var that = this;
    let messObservable = new Observable<any>(observer => {
      this.socket.on("message", message => {
        console.log("message observed");
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return messObservable;
  }
}
