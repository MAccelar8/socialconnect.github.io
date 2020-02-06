import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from "@angular/common/http";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppInterceptorService implements HttpInterceptor {
  constructor( public afs: AngularFirestore,
    public afAuth: AngularFireAuth) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> { 
    var user = JSON.parse(localStorage.getItem("user"));
    if(user==null){
      return from(this.handleAccess(req, next));
    }else{
      let TokenId = user.stsTokenManager.accessToken;
      // console.log("the token when user != null is:"+ TokenId)
      let headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        "token": TokenId.toString()
      });
      var clone  = req.clone({
        headers : headers
      })

      return next.handle(clone);
    }
        
 
  }
  private async handleAccess(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    console.log("Local storage user:");
    console.log(JSON.parse(localStorage.getItem('user')))
    const idToken = await this.afAuth.auth.currentUser.getIdToken(/* forceRefresh */ true)
    console.log(idToken);
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      "Token": idToken.toString()
    });
    // headers.append('Content-Type', 'application/json');
    //           headers.append("Token", idToken.toString() )
               var clone  = req.clone({
                headers : headers
              })

      console.log(headers)
              
    return next.handle(clone).toPromise();
  }
}


// handle(){
//     const user = JSON.parse(localStorage.getItem("user"));
//             var clone;
//            this.afAuth.auth.currentUser

//             this.afAuth.auth.currentUser.getIdToken(/* forceRefresh */ true)
//             .then(function(idToken) {


//               console.log("Token at frontEnd:");
              

//               const headers = new HttpHeaders().set('Content-Type', 'application/json');
//               headers.append('token', idToken )
//                clone  = req.clone({
//                 headers : headers
//               })
//               return next.handle(clone);

//             })
// }