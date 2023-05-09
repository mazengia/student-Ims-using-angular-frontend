import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DptService} from "../../services/dpt.service";
import {DepartmentService} from "../../services/department.service";
import {Department} from "../../model/department";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Dpt} from "../../model/dpt";
import {Student} from "../../model/student";

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.sass']
})
export class SearchStudentComponent implements OnInit {
  pageSize = 10;
  pageNumber = 1;
  departments: Department[];
  dptForm: FormGroup;
  program: Dpt[];
  students: Student[];
  constructor(
    private departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dptService: DptService
  ) {
    this.dptForm = this.fb.group({
       id: ['', [Validators.required]],
      program: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.departmentService.getDepartment(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        if (res._embedded) {
          this.departments=null;
          this.departments = res._embedded.departmentDTOes;
        }
      },
      error => {
        console.log("error = ", error)
      }
    )
  }

  onSubmit() {
    if (this.dptForm.invalid) {
      return;
    }
  }

  ngModelChangeDepartment(event: any): void {
    console.log("this.departmentId=", event)
    this.dptService.getDptByDepartmentId(this.pageNumber - 1, this.pageSize, event).subscribe((res) => {
      if (res._embedded) {
        this.program=null;
        this.program = res._embedded.dptDTOes;
      }
    });
  }
  ngModelChangeDpt(event: any): void {
    this.dptService.getStudentGroupByDptId(this.pageNumber - 1, this.pageSize, event).subscribe((res) => {
      console.log('vvvv=',res)
      if (res._embedded) {
        this.students=null;
        this.students = res._embedded.userDtoes;
      }
    });
  }
  getStudentsByDptId(){

  }
}

