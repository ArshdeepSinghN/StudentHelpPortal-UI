import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-peer-mentors',
  templateUrl: './peer-mentors.component.html',
  styleUrls: ['./peer-mentors.component.scss']
})
export class PeerMentorsComponent implements OnInit {
  userQueries: any[]=[];

  constructor(private commonService: CommonService) { }
  ngOnInit(): void {
    this.getUserQueries();
  }

  getUserQueries(){
    this.commonService.getUserQueries().subscribe((res)=>{
      console.log("user queries.",res);
      this.userQueries = res;
    });
  }

  resolveIssue(item:any){
    console.log("Issue resolved", item);

  }
}
