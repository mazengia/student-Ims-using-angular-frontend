import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authService: OAuthService) { }
  getUsername() {
    const claims = this.authService.getIdentityClaims();
    if (claims) {
      return null;
    }
    return  (claims as any).given_name;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getTokenDetails() {
    return jwtDecode(this.getToken());
  }

  getUserRoles() {
    return (this.getTokenDetails() as any).realm_access;
  }


}
