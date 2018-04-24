import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class ApiConectionService {

  constructor(private http: HttpClient, private router: Router) { }

  logIn(user, password) {
    let messageHeader = new HttpHeaders({ 'Contnet-Type': 'application/json' });
    let credentials = { "user": user, "password": password }
    let messageBody = JSON.stringify(credentials);

    return this.http.post('https://gameserver.centic.ovh/auth/login', messageBody, { headers: messageHeader});
  }

  isLoggedIn() {
    if(localStorage.getItem('tokenUser')) {
      return true;
    } else {
      //Devolver a la página de logIn
      //this.router.navigate(['/login']);
      return false;
    }

  }

  logOut() {
    localStorage.removeItem('tokenUser');
  }

}
