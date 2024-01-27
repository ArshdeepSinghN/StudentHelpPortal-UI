import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PrivateChat.UI';
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated())
      this.authService.setCurrentLoggedInUser();
    this.authService.sendAuthStateChangeNotification(true);
  }
}
