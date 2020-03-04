import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable, Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment, apiEndpoints } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private socketurl = environment.socketUrl;
  private serverURL = environment.baseURL;
  private socket;

  private obs = new Subject();
public obs$ = this.obs.asObservable();
  constructor(private http: HttpClient) {

    // console.log("Inside the constructor of CHAT_SERVICE")
    // console.log("Inside the connectSocket() of CHAT_SERVICE")
    // this.socket = io(this.url, {
    //   query: "uid=" + JSON.parse(localStorage.getItem("user")).uid.toString()
    // });
    // console.log("Socket is:");
    // console.log(this.socket);
    // io.connect();
  }

  /**
   * Connecting socket for the first time after login
   */
  connectSocket(){
    console.log("Inside the connectSocket() of CHAT_SERVICE")
    this.socket = io(this.socketurl, {
      query: "uid=" + JSON.parse(localStorage.getItem("user")).uid.toString()
    });
    console.log("Socket is:");
    console.log(this.socket);
  }

  sendvideocall(offer , toid){
    this.socket.emit("send-video-call-request" , {offer:offer, touid : toid})
  }
  sendvideocallanswer(offer , toid){
    this.socket.emit("send-video-call-answer" , {offer:offer, touid : toid})
  }

  sendFriendRequest(uid: string) {
    this.socket.emit("send-friend-request", { uid });
  }

  deleteFriendRequest(uid: string){
    this.socket.emit("delete-friend-request", { uid });
  }

  acceptFriendRequest(uid: string){
    this.socket.emit("accept-friend-request", { uid });
  }
  
  sendTypingStatus(uid , roomId){
    // console.log("send in service")
    this.socket.emit("typing", { senderId : uid , roomId : roomId });
  }
  recieveVideoCallRequest(){
    return Observable.create(observer=>{
      // console.log("recieve at service")
      this.socket.on('recieve-video-call-request' , message =>{
        console.log('recieve-video-call-request');
        observer.next(message)
      })
    })
  }

  recieveVideoCallAnswer(){
    return Observable.create(observer=>{
      // console.log("recieve at service")
      this.socket.on('recieve-video-call-answer' , message =>{
        console.log('recieve-video-call-answer');
        observer.next(message)
      })
    })
  }
  recieveTypingStatus(){
    return Observable.create(observer=>{
      // console.log("recieve at service")
      this.socket.on('recieve-typing' , message =>{
        console.log('Typing status Recieved');
        observer.next(message)
      })
    })
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

  deleteFriendsAcknowledgement(){
    return Observable.create(observer => {
      this.socket.on("friends-deleted", message => {
        console.log("Delete Friend Acknowledgement Recieved");
        observer.next(message);
      });
    });
  }

  recieveDeleteFriendAcknowledgement(){
    return Observable.create(observer => {
      this.socket.on("friend-request-deleted-acknowledgement", message => {
        console.log("Delete Friend Acknowledgement Recieved");
        observer.next(message);
      });
    });
  }

  rejectedFriendRequestNotification(){
    return Observable.create(observer => {
      this.socket.on("friend-request-rejected", message => {
        console.log("friend-request-rejected");
        observer.next(message);
      });
    });
  }

  getOfflineNotify(){
    return Observable.create(observer => {
      this.socket.on("status-change", message => {
        console.log("status-change");
        observer.next(message);
      });
    });
  }

  getReadMessageNotify(){
    return Observable.create(observer => {
      this.socket.on("message-read-ack", message => {
        console.log("message-read-ack");
        observer.next(message);
      });
    });
  }
  getReadMessageAllNotify(){
    return Observable.create(observer => {
      this.socket.on("message-read-all-ack", message => {
        console.log("message-read-all-ack");
        observer.next(message);
      });
    });
  }
  
/**
 * listening to recieved messages from server
 */
  recieveMessagefromRoom() {

    return Observable.create(observer => {
      this.socket.on("message-recieve", message => {
        console.log("message-recieve");
        observer.next(message);
      });
    });

    // var that = this;
    // let messObservable = new Observable<any>(observer => {
    //   this.socket.on("message-recieve", message => {
    //     console.log("message observed");
    //     console.log(message);
    //     observer.next(message);
    //   });
    //   // return () => {
    //   //   this.socket.disconnect();
    //   // };
    // });
    // return messObservable;
  }

  getAllMessagesfromCurrentRoom(room:string){
   return this.http.post( this.serverURL + apiEndpoints.GetAllMessages ,{room} )
  }

  /**
   * Sends Message to a particular Room
   * @param message message to send
   * @param roomId to that Room Id
   */
  sendMessage(message: String, room:string , displayName:string , time: number , id:string , rid:string , status:number) {
    console.log("Inside send Message!!!")
    console.log(status);
    var data = {
      message: message,
      room : room,
      displayName : displayName,
      time : time,
      senderId : id,
      recieverId : rid,
      status : status,
    };
    console.log(data)
    this.socket.emit("new-message", data);
  }

  createRoom(roomId) {
    console.log("Going to create room " , roomId)
    this.socket.emit("create", roomId);
  }

  disconnectFromRoom(){
    console.log("Disconnecting in chat service");
    this.socket.disconnect();
  }


  /**
   * updates the observable on new selection
   * @param data is details of the selected user
   */
  changeChatPerson(data:any){
    // console.log(data);
    console.log("inside service")
    this.obs.next(data);
  }


  sendReadNotify(data:any){
    this.socket.emit("message-read", data);
  }

  sendAllRead(uid , roomId){
    console.log("SEND ALL REASD")
    console.log(uid , "  ----  " , roomId);
    this.socket.emit("message-read-all" , { id : uid , roomId : roomId })
  }
}
