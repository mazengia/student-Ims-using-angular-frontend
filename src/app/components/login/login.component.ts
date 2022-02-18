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
    this.validateForm = this.login.group({
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
  public validateForm!: FormGroup;

  passwordVisible: Boolean = false;

  //
  onSubmit(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'INVALID') {
      this.message.create('warning', 'warning Empty Field Is Not Allowed');
      return;
    }


    if (this.validateForm.status === 'VALID') {
      this.authService.login(this.validateForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/main-app']);

        },
        err => {
          this.isLoginFailed = true;
          this.message.create( 'error',"Bad Credentials Please Try Again !!");
        }
      );
    }
  }




}






















