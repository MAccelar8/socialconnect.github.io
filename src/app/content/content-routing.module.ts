import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../pre-auth/shared/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { FriendsComponent } from './friends/friends.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FriendsDisplayComponent } from './friends-display/friends-display.component';



const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, 
  children: [
    {path: '', redirectTo: 'chat' , pathMatch: 'full' },
    {path: 'chat', component: ChatComponent},
    {path: 'friends', component: FriendsDisplayComponent},
    {path: 'people', component: FriendsComponent},
    { path: 'profile', component: ProfileComponent, },
    { path: 'notifications', component: NotificationsComponent, }
  ]},
  { path: 'profile', component: ProfileComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
