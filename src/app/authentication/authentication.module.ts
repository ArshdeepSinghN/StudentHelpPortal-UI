import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    RouterModule.forChild([
      {path:'registerUser', component: RegisterUserComponent},
      {path:'login', component: LoginComponent},
    ])
  ]
})
export class AuthenticationModule { }
