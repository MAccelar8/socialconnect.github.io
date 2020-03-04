// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  socketUrl : 'http://192.168.31.97:3000',
  baseURL: 'http://192.168.31.97:3000/api/',
  firebase: {
    apiKey: "AIzaSyDMW-J0DWvexpv5WSLJUK5fN9UoX6rDFFg",
    authDomain: "social-connect-5e34a.firebaseapp.com",
    databaseURL: "https://social-connect-5e34a.firebaseio.com",
    projectId: "social-connect-5e34a",
    storageBucket: "social-connect-5e34a.appspot.com",
    messagingSenderId: "381619314610",
    appId: "1:381619314610:web:5b4be755f9767c68714eab",
    measurementId: "G-ZVGQPJYE9H"
  }
};

export const apiEndpoints = {
  CheckUserOnlineStatus : 'getuseronlinestatus',
  SetPhotoURL : 'setphotourl',
  GetAllUsersWithFriendReq : 'getuserswithfriendrequest',
  GetAllFriends : 'getAllfriends',
  UserDetail : 'userdetail',
  GetUserInfoById : 'getuserbyid',
  GetAllUser : 'getallusers',
  GetNumberOfUserRequest : 'getnumberofuserrequest',
  DeleteFriend : 'deletefriends',
  GetAllMessages : 'getallmessages'

}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
