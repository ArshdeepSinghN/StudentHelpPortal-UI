import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-peer-tutor',
  templateUrl: './peer-tutor.component.html',
  styleUrls: ['./peer-tutor.component.scss']
})
export class PeerTutorComponent implements OnInit {
  userIssueTitle: string='';
  userIssueDesc: string='';
  constructor(private commonService: CommonService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  sendRequest(){
    this.commonService.SendUserTextQuery("0",this.userIssueTitle, this.userIssueDesc).subscribe((res)=>{
      console.log("Request Sent", res);
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Your request sent successfully'});
    })
  }

}
