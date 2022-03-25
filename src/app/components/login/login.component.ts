import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from "@angular/router";
import {AuthService} from "../../config/_services/auth.service";
import {TokenStorageService} from "../../config/_services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  disabled = false;
  loading = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private router: Router,
    public login: FormBuilder,
    private message: NzMessageService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.login.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  JSON = JSON;
  public loginForm!: FormGroup;

  passwordVisible: Boolean = false;

  //
  onSubmit(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (this.loginForm.status === 'INVALID') {
      this.message.create('warning', 'warning Empty Field Is Not Allowed');
      return;
    }


    if (this.loginForm.status === 'VALID') {
      this.loading = true;
      this.disabled = true;
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/main-app']).then(r => {
            return r
          });

        },
        err => {

          this.loading = false;
          this.disabled = false;
          this.isLoginFailed = true;
          this.message.create('error', "Bad Credentials Please Try Again !!");
        }
      );
    }
  }


}






















