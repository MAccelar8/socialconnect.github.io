import { BrowserModule } from "@angular/platform-browser";
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./pre-auth/shared/services/auth.service";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { PreAuthModule } from "./pre-auth/pre-auth.module";
import { ContentModule } from "./content/content.module";
import { NotAuthorizedComponent } from "./not-authorized/not-authorized.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserService } from './services/user.service';
import { AppInterceptorService } from './app-interceptor.service';
import { ChatService } from './services/chat.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ReplaceEmojisPipe } from './pipes/replace-emojis.pipe';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, NotAuthorizedComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    PreAuthModule,
    ContentModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PickerModule,
    MatIconModule
  ],
  providers: [AuthService,UserService,ChatService ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi:  true
    }
  ],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [LoaderComponent]
})
export class AppModule {}
