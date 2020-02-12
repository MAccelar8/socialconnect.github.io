import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

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

@NgModule({
  declarations: [AppComponent, NotAuthorizedComponent],
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
    HttpClientModule
  ],
  providers: [AuthService,UserService,ChatService ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi:  true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
