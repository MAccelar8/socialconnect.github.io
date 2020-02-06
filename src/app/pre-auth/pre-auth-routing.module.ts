import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LogInComponent } from "./log-in/log-in.component";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard";
import { SignInComponent } from "./sign-in/sign-in.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { PreAuthComponent } from "./pre-auth.component";

const routes: Routes = [
  {
    path: "", redirectTo: 'pre-auth',pathMatch: 'full'
  },
  {
    path: "pre-auth",
    component: PreAuthComponent,
    children: [
      { path: "", component: LogInComponent, canActivate: [SecureInnerPagesGuard] },
      {
        path: "register-user",
        component: SignInComponent,
        canActivate: [SecureInnerPagesGuard]
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        canActivate: [SecureInnerPagesGuard]
      },
      {
        path: "verify-email-address",
        component: VerifyEmailComponent,
        canActivate: [SecureInnerPagesGuard]
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreAuthRoutingModule {}
