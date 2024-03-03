import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit, AfterViewInit {

  value1:any ='';
  display= 'none';
  clientRegistartionForm!: FormGroup;

  @ViewChild("registrationModal") registrationModal: any;

  constructor(private commonService: CommonService, private route: Router,private activateRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private toastMessage: MessageService ) { }

  ngOnInit(): void {
    this.initForm();
    this.activateRoute.paramMap.subscribe(()=>{
      this.display = 'block';
    });
  }

  ngAfterViewInit(): void {
   this.display = 'block';
  }

  initForm(){
    this.clientRegistartionForm = this.formBuilder.group({
      userName : ['', Validators.required],
      email : ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.maxLength(8)]],
    });
  }

  onCloseHandled(){
    this.route.navigate(["user/view"]);
   this.display = 'none';
  }

  saveUserData(){
    this.commonService.SaveUser(this.clientRegistartionForm?.value).subscribe(res=>{
      this.toastMessage.add({severity:'success', summary:'User has been added successfully'});
      this.onCloseHandled();
    });
  }

}
