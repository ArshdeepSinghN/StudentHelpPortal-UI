import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserForRegistrationDto } from 'src/app/Model/Registration/userForRegistrationDto.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private authService: AuthenticationService, private fb: FormBuilder, private messageService:MessageService,
    private router:Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['',[Validators.required,this.confirmPasswordValidator()]]
    });
  }

  private confirmPasswordValidator(): ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null =>
    {
      const confirmPasswordValue= control.value;
      const password = this.registerForm?.get('password')?.value;
      if(confirmPasswordValue ===''){
        return {required: true};
      }
      if(password !== confirmPasswordValue){
          return {mustMatch: true};
      }
      return null;
   }
  }

  public validateControl(controlName: string){
    return this.registerForm.get(controlName)?.invalid && this.registerForm.get(controlName)?.touched
  }

  public hasError(controlName: string, errorName: string){
    return this.registerForm.get(controlName)?.hasError(errorName)
  }

  public registerUser(registerFormValue:any){
    const formValues = { ...registerFormValue };

    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    this.authService.registerUser(user)
    .subscribe({
      next: (_) => {
        this.messageService.add({severity:'success', summary:'Success', detail: 'Successfully registration', sticky: true});
        this.router.navigate(["/authentication/login"]);
      },
      error: (err: HttpErrorResponse) =>
      {
        const errorMessage = err.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: errorMessage, sticky: true});
      }
    })
  }
}
