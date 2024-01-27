import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserComponent } from './user/user.component';
import { AiHelpComponent } from './ai-help/ai-help.component';
import { PeerTutorComponent } from './peer-tutor/peer-tutor.component';
import { PeerMentorsComponent } from './peer-mentors/peer-mentors.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  {
    path: 'user/register', component: RegisterUserComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/login', component: LoginComponent,// canActivate: [AuthGuard]
  },
  // {
  //   path: 'user/view', component: UserComponent, canActivate: [AuthGuard]
  // },
  // {
  //   path: 'chat', component: ChatComponent, // canActivate: [AuthGuard]
  // },
  {
    path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
  }
  //,
  // {
  //   path:'', component: ChatComponent, canActivate: [AuthGuard]
  // }
  // {
  //   path: 'tutor', component: PeerTutorComponent
  // },
  // {
  //   path: 'mentor', component: PeerMentorsComponent
  // },
  // {
  //   path: 'bot', component: AiHelpComponent
  // }
  ,{
    path:'', component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
