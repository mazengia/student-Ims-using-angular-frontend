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
//
//   constructor(
//     private router: Router,
//     public login: FormBuilder,
//     private message: NzMessageService
//   ) {
//   }
//
//   JSON = JSON;
//   public validateForm!: FormGroup;
//
//   passwordVisible: Boolean = false;
//
//   //
//   onSubmit(): void {
//     for (const i in this.validateForm.controls) {
//       this.validateForm.controls[i].markAsDirty();
//       this.validateForm.controls[i].updateValueAndValidity();
//     }
//
//     //
//     if (this.validateForm.status === 'INVALID') {
//       this.message.create('warning', 'warning');
//       return;
//     }
//
//
//     if (this.validateForm.status === 'VALID') {
//       const {username, password} = this.validateForm.value;
//       if (username === 'admin' && password === '123456') {
//         // this.message.create('success', 'success');
//         this.router.navigate(['/main-app']);
//       } else {
//         this.message.create('error', 'error');
//       }
//     }
//   }
//
//
//   ngOnInit(): void {
//     this.validateForm = this.login.group({
//       username: ['', [Validators.required]],
//       password: ['', [Validators.required]],
//       remember: [true]
//     });
//   }
//
// }
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
