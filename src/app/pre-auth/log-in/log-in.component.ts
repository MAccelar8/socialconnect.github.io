import { Component, OnInit } from "@angular/core";
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { AuthService } from "../shared/services/auth.service";
import * as $ from "jquery";
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"]
})
export class LogInComponent implements OnInit {
  constructor(public authService: AuthService , private loader : LoaderService) {}
  form = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required , Validators.pattern("(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,12}")])
  })
  ngOnInit() {}

  googleLogin(){
    this.authService.GoogleAuth()
  }

  manualLogin(){
    if(this.form.valid){
      this.loader.show('Manual Login')
      this.authService.SignIn(this.form.value.email , this.form.value.password).then(data=>{
        this.loader.hide();
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

  inputValidate(){
       
  }
}
