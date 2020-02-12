import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FriendsComponent } from './friends/friends.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FriendsDisplayComponent } from './friends-display/friends-display.component';
import { FriendsChatListComponent } from './chat/friends-chat-list/friends-chat-list.component';
import { ChatAreaComponent } from './chat/chat-area/chat-area.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ChatComponent,
    FriendsComponent,
    NotificationsComponent,
    FriendsDisplayComponent,
    FriendsChatListComponent,
    ChatAreaComponent,
    
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentModule { }
