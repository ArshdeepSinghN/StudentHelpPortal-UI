import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public clientMessage = new BehaviorSubject<any>('');
  public connectionId! : string;
  public hubConnection!: signalR.HubConnection;

  constructor() {
    this.startConnection().then(()=>{
      console.log('connection started');

    });
   }

  public async startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(environment.apiAddress+'/chatMessage',{skipNegotiation:true,transport:signalR.HttpTransportType.WebSockets})
                            .build();
    await this.hubConnection
      .start()
      .then(() => console.log('SignalR -- Connection started'))
      .catch(err => { console.log(err)})

      this.hubConnection.on('message',(data)=>{
        this.clientMessage.next(data);
      });

  }
}
