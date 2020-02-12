import { Injectable} from "@angular/core";
import {
  HttpClient,
} from "@angular/common/http";
import { AngularFireStorage } from "@angular/fire/storage";
import { environment, apiEndpoints } from 'src/environments/environment';
@Injectable({
  providedIn: "root"
})
export class UserService {
  globaluser: any;
  uploadPercent: any;
  downloadURL: any;
  baseURL:string = environment.baseURL;
  notificationCount: Number
  constructor(private http: HttpClient, private storage: AngularFireStorage) {
    this.globaluser = JSON.parse(localStorage.getItem("user"));
  }

  async uploadimage(imgfile: File , uid:string) {
    
    const filePath = "/profilepictures/" + uid;
    const fileRef = this.storage.ref(filePath);
    
     await this.storage.upload(filePath, imgfile)
      console.log("upload success")
      return fileRef.getDownloadURL();
    
  }

   
  
  setPhotoUrl(photoUrl: string) {
    var req = {
      photoUrl : photoUrl
    }
    return this.http.post(this.baseURL + apiEndpoints.SetPhotoURL, req)
  }

  getAllUsersWithFriendRequest(){
    return this.http.get(this.baseURL + apiEndpoints.GetAllUsersWithFriendReq)
  }
  getNumberOfUsersWithFriendRequest(){
    this.http.get(this.baseURL + apiEndpoints.GetNumberOfUserRequest).subscribe((data:any)=>{
      if(data.status){
        this.notificationCount = data.message;
      }else{
        this.notificationCount = 0;
      }
    })
  }
  getAllFriends(){
    return this.http.get(this.baseURL + apiEndpoints.GetAllFriends)
  }
  getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.displayName;
  }

  getUserDetails() {
    return this.http.get(this.baseURL + apiEndpoints.UserDetail);
  }

  getUserInfobyID(uid:string) {
    console.log("send request for notifications to server")
    return this.http.post(this.baseURL + apiEndpoints.GetUserInfoById , {uid})
  }

  setUserDetails(userdetails: any) {
    console.log(userdetails);
    return this.http.post(this.baseURL + apiEndpoints.UserDetail, userdetails);
  }

  deleteFriends(uid){
    console.log('inside service to delete' , uid)
    return this.http.post(this.baseURL + apiEndpoints.DeleteFriend , {uid})
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
    return this.http.get(this.baseURL + apiEndpoints.GetAllUser)
  }
}
