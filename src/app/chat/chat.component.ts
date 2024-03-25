import { Component, OnInit } from '@angular/core';
import { Chat } from '../Model/Chat/chat.model';
import { UserChatClients } from '../Model/Chat/user-chat-clients.model';
import { Message } from '../Model/message.model';
import { User } from '../Model/user.model';
import { AuthenticationService } from '../service/authentication.service';
import { CommonService } from '../service/common.service';
import { SignalRService } from '../service/signal-r.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  users!: User[];
  searchData!: string[];
  searchChatData!: User[];
  searchText!: string;
  searchFieldName: string = 'Search User';
  userChats: Chat[] = [];
  isChatSelected: boolean= false;
  selectedChat: any;
  selectedChatUserId!: string;
  currentChatMessage: Message[]=[];
  message!: string;

  // need to update based on login user
  currentUserID!:string;
  currentUserName!: string;

  userIssueDesc: string='';
  ques: string = '';
  desc: string = '';
  constructor(private commonService: CommonService, private signalRService: SignalRService, private authService: AuthenticationService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.currentUserID = this.authService?.currentUser?.id!;
    this.currentUserName  = this.authService?.currentUser?.name;
    this.getAllUsers();
    this.getUserChatClients();
    this.getNewMessage();

    this.route.queryParams.subscribe(params => {
      this.ques = params['ques'];
      this.desc = params['desc'];
    });
  }

  sendRequest(){
    // this.commonService.SendUserTextQuery("0",this.userIssueTitle, this.userIssueDesc).subscribe((res)=>{
    //   console.log("Request Sent", res);
    //   this.messageService.add({severity:'success', summary:'Service Message', detail:'Your request sent successfully'});
    // })
  }

  getAllUsers() {
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

  getUserChatClients() {
    this.commonService.getUserChatsByUserId(this.currentUserID).subscribe({
      next: (value: any) => {
        if(value && value?.chats?.length>0){
          this.userChats = value['chats'];
          this.scrollToBottomOfChat();
          console.log('Data from user call', value);
        }
      },
      error: (err: any) => {
        console.log('Error from user call', err);
      }
    });
  }

  search(event: any) {
    this.searchChatData = this.users.filter(res => res.name.includes(event.query));
    this.searchData = this.searchChatData.map(out => out.name);
  }

  addSelectedChatClient(selectedChatClientName: any) {
    let client = this.userChats.find(s => s.name === selectedChatClientName)
    if (!client) {
      let selectedChatClient = this.searchChatData.find(res => res.name === selectedChatClientName)
      this.commonService.AddChatClient(this.currentUserID, selectedChatClient?.id, selectedChatClientName).subscribe({
        next: (value: any) => {
          this.userChats = this.userChats.concat(value['chats']);
        }
      });
    }
    else{
      // select that client list
    }
    // add into
  }

  onClientSelection(data:Chat){
    this.isChatSelected = true;
    this.selectedChat = data.chat_Id;
    this.selectedChatUserId = data.chat_UserId;
    this.getMessages(this.selectedChatUserId);
  }

  getMessages(chatId: string){
    this.commonService.getUserChatMessage(this.currentUserID, chatId).subscribe({
      next: (value:Message[]) =>{
        this.currentChatMessage = value;
        console.log(`Message: ${this.currentChatMessage}`);
      },
      error: (err: Error) =>{
        console.log(err);
      }
    });
  }

  sendMessage(){
    console.log(`new message: ${this.message}`);
    //send post
    this.scrollToBottomOfChat();
    this.commonService.SendMessage(this.selectedChatUserId, this.message).subscribe({
      next: (value:any) =>{
        this.currentChatMessage?.push(value);
        this.message = '';
        //add msg in existing message queue

      },
      error: (err: Error) =>{

      },
    })
    //clear text field this.message='';

  }

  getNewMessage(){
    this.signalRService.clientMessage.subscribe({
      next: ( value:Message)=>{
        if( value!=null && this.currentUserID === value.to_ChatId){
          this.currentChatMessage?.push(value);
          this.scrollToBottomOfChat();
          // decypt msg and show it

          // add message in existing message queue.
        }
      },
      error(err) {
        console.log('some issue with signalR',err);

      },
    });
  }

  scrollToBottomOfChat(){
    setTimeout(() => {
      var objDiv = document.getElementById("rightPanel");
      if(objDiv){
        objDiv!.scrollTop = objDiv!.scrollHeight;
      }
    }, 100);
  }

  // getTimeDifference(message?: Message){
  //   const currentTime= new Date().getUTCMinutes();
  //   let chatTime = new Date(message?.sendAt!).getUTCMinutes();
  //   let diff =  currentTime -chatTime!;
  //   if(diff<0){
  //     diff = 24+ diff;
  //   }
  //   return diff
  // }

}
