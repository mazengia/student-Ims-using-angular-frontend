import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../../services/student.service";
import {EnrolStudentService} from "../../../services/enrolStudent.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {finalize} from "rxjs/operators";
import {NzDrawerRef} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-create-update-enrolled-student',
  templateUrl: './create-update-enrolled-student.component.html',
  styleUrls: ['./create-update-enrolled-student.component.sass']
})
export class CreateUpdateEnrolledStudentComponent implements OnInit {
  statusList:any;
  semestersList:any;
  certificationYearList:any;
  sectionsList:any;
  addStudentForm: FormGroup;
  listOfStudent:any;
  @Input() value: number;
  isAddMode = true;
  constructor(private fb: FormBuilder,
              private notification: NzNotificationService,
              private studentService:StudentService ,
              private drawerRef: NzDrawerRef<string>,
              private enrolStudentService:EnrolStudentService) {

    this.addStudentForm = this.fb.group({
      semesters: this.fb.group({
        id: [null, [Validators.required]]
      }),
      sections: this.fb.group({
        id: [null, [Validators.required]]
      }),
      certificationYear: this.fb.group({
        id: [null, [Validators.required]]
      }),
      pgpa: [],
      cgpa: [],
      student: this.fb.group({
        id: [null, [Validators.required]]
      })
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    this.loadStatus();
    this.loadStudent();
    this.loadSemesters();
    this.loadCertificationYear();
    this.loadSections();
    if (this.value) {
      this.loadDptById();
    }
  }
  private loadDptById() {
    console.log('id=',this.value)
    this.enrolStudentService.findStudentById(this.value)
      .subscribe((res) => {
        console.log('ptch=',res)
        this.addStudentForm.patchValue(res);
      });
  }
  resetForm(){
    for (const key in this.addStudentForm.controls) {
      if (this.addStudentForm.controls.hasOwnProperty(key)) {
        this.addStudentForm.controls[key].markAsDirty();
        this.addStudentForm.controls[key].updateValueAndValidity();
      }
    }
  }
  loadStudent() {
    this.studentService.getStudent()
      .subscribe(res => {
          this.listOfStudent = res._embedded.userDtoes;
          console.log('student = ', res)
        },
        error => {
          console.log('error=', error);
        })
  }

  ngOnSubmit(): void {
   this.resetForm();

    if (this.addStudentForm.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.enrollStudent();
    } else {
      this.updateForm();
    }
  }
  enrollStudent( ): void {
    console.log(this.addStudentForm.value)
    this.enrolStudentService.enrolStudent(this.addStudentForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
      data => {
        this.createNotification(
          'success',
          'Enroll',
          'Student Enrolled Successfully Created'
        );
        console.log(data);
      },
      error => {
        this.createNotification(
          'error',
          'Error',
          error.error.message);
      }
    )
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  updateForm( ): void {
    this.resetForm();
    this.enrolStudentService.updateStudent(this.value, this.addStudentForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
      data => {
        this.createNotification(
          'success',
          'Enrolled Student',
          'Enrolled Student Successfully Updated'
        );
        console.log("update dtt=",data)
      },
      error => {
        this.createNotification(
          'error',
          'Error',
          error.error.message);
        console.log('error',error)
      }
    )
  }
  loadStatus() {
    this.enrolStudentService.getStatus()
      .subscribe(res => {
          this.statusList = res;
        },
        error => {
          console.log('error=', error);
        })
  }
  loadSemesters() {
    this.enrolStudentService.getSemesters()
      .subscribe(res => {
        console.log("semester=",res)
          this.semestersList = res._embedded.semestersDtoes
        },
        error => {
          console.log('error=', error);
        })
  }
  loadCertificationYear(){
    this.enrolStudentService.loadCertificationYear()
      .subscribe(res => {
          console.log("certificationYearDtoes=",res)
          this.certificationYearList = res._embedded.certificationYearDtoes
        },
        error => {
          console.log('error=', error);
        })
  }
   loadSections(){
     this.enrolStudentService.loadSections()
       .subscribe(res => {
           console.log("sectionsDtoes=",res)
           this.sectionsList = res._embedded.sectionsDtoes
         },
         error => {
           console.log('error=', error);
         })
   }

}
