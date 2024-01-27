import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponseDto, UserForAuthenticationDto } from '../Model/Auth/authDtos.model';
import { UserForRegistrationDto } from '../Model/Registration/userForRegistrationDto.model';
import { User } from '../Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseApiUrl = '';
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();
  public currentUser!: User;

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) {
    this.baseApiUrl = environment.apiAddress;
  }

  registerUser(user: UserForRegistrationDto) {
    const body = JSON.stringify(user);
    return this.httpClient.post<any>(this.baseApiUrl + '/Registration', body, { headers: this.getHeader() });
  }

  public loginUser(body: UserForAuthenticationDto) {
    return this.httpClient.post<AuthResponseDto>(this.baseApiUrl + '/Login', body, { headers: this.getHeader() });
  }

  public sendAuthStateChangeNotification(isAuthenticated: boolean) {
    this.authChangeSub.next(isAuthenticated);
  }

  public logout() {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public isUserAuthenticated() {
    const token = localStorage.getItem("token");
    const isAuth = token && !this.jwtHelper.isTokenExpired(token);
    this.sendAuthStateChangeNotification(!!isAuth);
    return isAuth;
  }

  public setClaimsInLocalStorage(claims: any) {
    const user_Id = claims.find((x: any) => x.type.includes('nameidentifier'))?.value;
    const email = claims.find((x: any) => x.type.includes('emailaddress'))?.value;
    const name = claims.find((x: any) => x.type.includes('UserName'))?.value;
    localStorage.setItem('nameidentifier', user_Id);
    localStorage.setItem('emailaddress', email);
    localStorage.setItem('UserName', name);
  }

  public setCurrentLoggedInUser(){
    const user = new User();
    // const claims = localStorage.getItem("claims");
    user.id = localStorage.getItem('nameidentifier');
    // user.email = localStorage.getItem('emailaddress')!;
    user.name = localStorage.getItem('UserName')!;
    this.currentUser = user;
  }

  public getCurrentUser(){

  }

  private getHeader(): HttpHeaders {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json')
    return header;
  }

}
