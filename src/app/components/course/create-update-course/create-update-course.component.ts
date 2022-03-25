import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {CourseService} from "../../../services/course.service";
import {Department} from "../../../model/department";
import {DepartmentService} from "../../../services/department.service";

@Component({
  selector: 'app-create-update-course',
  templateUrl: './create-update-course.component.html',
  styleUrls: ['./create-update-course.component.sass']
})
export class CreateUpdateCourseComponent implements OnInit {
  isAddMode = true;
  loading = false;
  submitted = false;
  departments: Department[]   ;
  @Input() value: number;
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private departmentService: DepartmentService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      creditHour: ['', [Validators.required]],
      ects: ['', [Validators.required]],
      department:this.fb.group({
        id: ['', [Validators.required]],
      })
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.loadCourseById();
    }
    this.loadDepartments();
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.saveCourse();
    } else {
      this.updateCourse();
    }
  }

  saveCourse(): void {
    this.resetForm();
    this.courseService.addCourse(this.courseForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Course',
            'Course Successfully Created'
          );
        },
        (error) => {
          console.log('error = ', error)
          this.createNotification(
            'error',
            'Error',
            error.error.message);
        }
      );
  }

  loadDepartments() {
    this.departmentService.getDepartment().subscribe(
      res => {
        console.log("course = ",res)
        this.departments = res._embedded.departmentDTOList;
      }
    )

  }

  resetForm(): void {
    for (const key in this.courseForm.controls) {
      if (this.courseForm.controls.hasOwnProperty(key)) {
        this.courseForm.controls[key].markAsDirty();
        this.courseForm.controls[key].updateValueAndValidity();
      }
    }
  }

  private loadCourseById() {
    this.courseService
      .findCourseById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.courseForm.patchValue(res);
        }
      });
  }

  updateCourse(): void {

    this.resetForm();
    this.courseService
      .updateCourse(this.value, this.courseForm.value)
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Course',
            'Course Successfully Updated'
          );
        },
        error => {
          console.log(error)
          this.createNotification(
            'error',
            'Error',
            error.message);
        }
      );
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}
