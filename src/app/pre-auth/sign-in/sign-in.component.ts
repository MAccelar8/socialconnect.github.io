import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService , private loader : LoaderService) { }
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required , Validators.pattern("(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,12}")]),
    username : new FormControl('' , [Validators.required])
  })
  ngOnInit() {
    
  }

  SignUp(){
    console.log("Button Clicked")
    if(this.form.valid){
      console.log(this.form.value);
      var value = this.form.value;
      this.loader.show('message')
      this.authService.SignUp(value.email , value.password , value.username ).then(data=>{
      this.loader.hide()
      })
    }
  }

  eyeclick() {  
   
    $('.fa-eye').toggleClass('fa-eye-slash');

    if ($('#eye').attr("type") == "password") {
      $('#eye').attr("type", "text");
    } else {
      $('#eye').attr("type", "password");
    }
}

}
