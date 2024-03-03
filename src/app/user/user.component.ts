import { Component, OnInit } from '@angular/core';
import { User } from '../Model/user.model';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users!: User[];
  columns!: any[];
  userSelection!: User;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getUsersData();
    this.columns = [
      { field: 'name', header: 'User Name' },
      { field: 'email', header: 'Email' },
      { field: 'password', header: 'Password' },
    ]
  }

  getUsersData() {
    this.commonService.getAllUsers().subscribe({
      next: (value: any) => {
        this.users = value;
        console.log('Data from user call', value);
      },
      error: (err: any) => {
        console.log('Error from user call', err);
      }
    });
  }

}
