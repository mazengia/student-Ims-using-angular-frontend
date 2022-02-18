import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../config/_services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit{
  title = 'Student Information Management system';
  isCollapsed = false;
  roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  role:string;
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {
    this.role = String(activatedRoute.snapshot.paramMap.get("roles"));
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);

  }
}
