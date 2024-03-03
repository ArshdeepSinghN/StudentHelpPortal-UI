import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";

// import { UserRegisterComponent } from './user/user-register/user-register.component';
import { NavBarHeaderComponent } from './layout/nav-bar-header/nav-bar-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputTextModule } from 'primeng/inputtext';
// import { UserComponent } from './user/user.component';
// import { SubNavComponent } from './layout/sub-nav/sub-nav.component';

import {TableModule} from 'primeng/table'
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';


// import { ChatComponent } from './chat/chat.component';
import { InterceptorService } from './service/interceptor.service';
import { AiHelpComponent } from './ai-help/ai-help.component';
import { PeerTutorComponent } from './peer-tutor/peer-tutor.component';
import { PeerMentorsComponent } from './peer-mentors/peer-mentors.component';
import { HomeComponent } from './home/home.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    // UserRegisterComponent,
    NavBarHeaderComponent,
    // UserComponent,
    // SubNavComponent,
    // ChatComponent,
    AiHelpComponent,
    PeerTutorComponent,
    HomeComponent,
    PeerMentorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    InputTextModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    FormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7139"],
        disallowedRoutes:[]
      }
    })
  ],
  providers: [MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
