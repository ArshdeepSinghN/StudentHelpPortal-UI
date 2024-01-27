import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AuthResponseDto, UserForAuthenticationDto } from 'src/app/Model/Auth/authDtos.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private returnUrl!: string;
  loginForm!: FormGroup;
  errorMessage: string = '';
  showError!: boolean;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl(controlName: string) {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched
  }

  hasError(controlName: string, errorName: string){
    return this.loginForm.get(controlName)?.hasError(errorName)
  }

  loginUser(loginFormValue: any){
    this.showError = false;
    const login = {... loginFormValue };

    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password
    }

    this.authService.loginUser(userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
        this.messageService.add({severity:'success', summary:'Success', detail: 'Successfully registration', sticky: true});
       localStorage.setItem("token", res.token);
       this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       this.authService.setClaimsInLocalStorage(res.claims);
       this.authService.setCurrentLoggedInUser();
       this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      const errorMessage = err.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: errorMessage, sticky: true});
    }})
  }
}
