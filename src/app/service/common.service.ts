import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserComponent } from '../user/user.component';
import { User } from '../Model/user.model';
import { UserChat } from '../Model/Chat/user-chat.model';
import { Message } from '../Model/message.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private baseApiUrl = 'https://localhost:7139';

  currentUserId!: string
  currentUserName!: string;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
  }

  getAllUsers(): Observable<any>{
    return this.httpClient.get(this.baseApiUrl+'/Admin');
  }

  getUserChatsByUserId(userId?: any): Observable<any>{
    return this.httpClient.get(this.baseApiUrl+'/Chat/'+userId);
  }

  getUserChatMessage(userId: string, chatId: string): Observable<any>{
    return this.httpClient.get(this.baseApiUrl+'/Chat/GetChatMessage/'+userId+'/'+chatId);
  }



  SaveUser(data:any): Observable<any>{
    const userModelData: User = {
      name : data.userName,
      // email : data.email,
      // password : data.password
    }
    const body = JSON.stringify(userModelData);
    return this.httpClient.post<any>(this.baseApiUrl+'/Admin', body, { headers: this.getHeader()});
  }

  AddChatClient(currentUserID: string, selectedChatUserId: string, selectedChatUserName: string){
    const userChatModel: UserChat ={
      chat_Id : selectedChatUserId,
      user_Id : currentUserID,
      chatUserName: selectedChatUserName
    }
    const body = JSON.stringify(userChatModel);
    return this.httpClient.post<any>(this.baseApiUrl+'/Chat', body, { headers: this.getHeader()});
  }

  SendMessage(selectedChatUserId: string, messageText: string): Observable<any>{
    const message: Message ={
      from_UserId: this.authService.currentUser.id,
      from_UserName: this.authService.currentUser.name,
      to_ChatId: selectedChatUserId,
      messageText: messageText,
      sendAt: new Date()
    }


    const body = JSON.stringify(message);
    return this.httpClient.post<any>(this.baseApiUrl+'/Chat/AddChatMessage',body, { headers: this.getHeader()} )
  }

  getUserQueries(): Observable<any>{
    return this.httpClient.get(this.baseApiUrl+'/Chat/GetUserQueries/');
  }

  SendUserTextQuery(selectedChatUserId: string, messageText: string,messageTitle: string ): Observable<any>{
    const message: Message ={
      from_UserId: "101",
      from_UserName: "Arshde",
      to_ChatId: "0",
      messageTitle: messageTitle,
      messageText: messageText,
      sendAt: new Date()
    }

    const body = JSON.stringify(message);
    return this.httpClient.post<any>(this.baseApiUrl+'/Chat/SendUserTextQuery',body, { headers: this.getHeader()} )
  }

  private getHeader(): HttpHeaders{
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json')
    return header;
  }


}
