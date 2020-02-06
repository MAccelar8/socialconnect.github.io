import { Injectable, NgZone } from "@angular/core";
import { finalize } from "rxjs/operators";
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { AngularFireStorage } from "@angular/fire/storage";
import { resolve } from 'url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {
 
 
  
  globaluser: any;
  uploadPercent: any;
  downloadURL: any;
  constructor(private http: HttpClient, private storage: AngularFireStorage) {
    this.globaluser = JSON.parse(localStorage.getItem("user"));
  }

  async uploadimage(imgfile: File , uid:string) {
    
    const filePath = "/profilepictures/" + uid;
    const fileRef = this.storage.ref(filePath);
    
     await this.storage.upload(filePath, imgfile)
    //  .then(data => {
      console.log("upload success")
      return fileRef.getDownloadURL();
      // .subscribe((data)=>{
      //   console.log("got url successfully")
      //   localStorage.setItem('profileurl' , data);
      // })
    // });

  }
  setPhotoUrl(photoUrl: string) {
    var req = {
      photoUrl : photoUrl
    }
    return this.http.post("http://localhost:3000/api/setphotourl" , req)
  }
  getAllNotifications() {
    
    return this.http.get('http://localhost:3000/api/getallrequests')
  }

  getAllFriends(){
    return this.http.get('http://localhost:3000/api/getAllfriends')
  }
  getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.displayName);
    return user.displayName;
  }

  getUserDetails() {
    return this.http.get("http://localhost:3000/api/profile");
  }

  getUserInfobyID(uid:string) {
    console.log("send request for notifications to server")
    return this.http.post("http://localhost:3000/api/getuserbyid" , {uid})
  }

  setUserDetails(userdetails: any) {
    console.log(userdetails);
    return this.http.post("http://localhost:3000/api/profile", userdetails);
  }

  testMethod() {
    this.http.get("http://localhost:3000/api/profile").subscribe((res: any) => {
      console.log("Heyyyy Token Sent");
      if (res.status) {
        // console.log(JSON.parse(localStorage.getItem("user")))
        console.log(res);
      }
    });
  }

  getAllUsers(){
    return this.http.get("http://localhost:3000/api/getallusers")
  }
}
