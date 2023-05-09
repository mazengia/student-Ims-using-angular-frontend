import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../config/_services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DepartmentService} from "../../services/department.service";
import {Department} from "../../model/department";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
  title = 'Student Information Management system';
  isCollapsed = false;
  roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  role: string;
  pageSize = 10;
  pageNumber = 1;
  departments: Department[];

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute,) {
    this.role = String(activatedRoute.snapshot.paramMap.get("roles"));
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.loadDepartments();
    } else {
      this.router.navigate(['/login']).then(r => {
      });
    }
  }

  // destroyModal(departmentId:any) {
  //   this.router.navigate(['/department/'+departmentId]).then(r => {
  //   });
  // }
  loadDepartments(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.departmentService.getDepartment(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        if (res._embedded) {
          this.departments = res._embedded.departmentDTOes;
        }
      },
      error => {
        console.log("error = ", error)
      }
    )

  }

  goToPage(id: any) {
    this.router.navigateByUrl("main-app/student/" + id);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']).then(r => {
    });
  }
}
