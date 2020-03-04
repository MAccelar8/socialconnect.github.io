import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SecureInnerPagesGuard } from "./pre-auth/shared/guard/secure-inner-pages.guard";
import { NotAuthorizedComponent } from "./not-authorized/not-authorized.component";
import { ProfileComponent } from './content/profile/profile.component';
import { MyCompComponent } from './my-comp/my-comp.component';

const routes: Routes = [
  { path: "", loadChildren: () => import('./pre-auth/pre-auth.module').then(m => m.PreAuthModule) },
  { path: "mycomp", component: MyCompComponent },
  // {path: 'preauth', loadChildren: './pre-auth/pre-auth.module#PreAuthModule'},
  { path: "content", loadChildren: () => import('./content/content.module').then(m => m.ContentModule) },
  { path: "not-authorized", component: NotAuthorizedComponent },
  { path: 'profile', component: ProfileComponent, },
  {
    path: "**", redirectTo: '',pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [MyCompComponent]
})
export class AppRoutingModule {}
