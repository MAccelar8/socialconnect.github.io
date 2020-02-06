import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreAuthRoutingModule } from './pre-auth-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PreAuthComponent } from './pre-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PreAuthComponent,
    LogInComponent,
    SignInComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    PreAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PreAuthModule { }
