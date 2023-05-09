import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../services/student.service';
import {EnrolStudentService} from '../../services/enrolStudent.service';
import {CreateUpdateDptComponent} from "../dpt/create-update-dpt/create-update-dpt.component";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {DptService} from "../../services/dpt.service";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {
  CreateUpdateEnrolledStudentComponent
} from "./create-update-enrolled-student/create-update-enrolled-student.component";

@Component({
  selector: 'app-student-enrol',
  templateUrl: './student-enrol.component.html',
  styleUrls: ['./student-enrol.component.scss']
})
export class StudentEnrolComponent implements OnInit, AfterContentChecked  {
  searchValue = '';
  visible = false;
  visibleDrawer = false;
  isModalVisible = false;
  isConfirmLoading = false;

  editObject: any
  successMessage: any;
  errorMessage: any;
  allUserData: any;
  listOfStudentData: any;
  listOfStudent:any;
  statusList: any;
  listOfDptData: any;// @ts-ignore
  listOfData: DataItem[] = [];
  addStudentForm: FormGroup;
  deleteForm: FormGroup;
  editForm: FormGroup;
  id: FormControl;
  visibleEditDrawer = false;
  constructor(private fb: FormBuilder,
              private studentService:StudentService ,
              private enrolStudentService:EnrolStudentService,
              private notification: NzNotificationService,
              private drawerService: NzDrawerService,) {

    this.addStudentForm = this.fb.group({
      firstSemester: ['', Validators.required],
      secondSemester: ['', Validators.required],
      thirdSemester: ['', Validators.required],

      firstSemesterPoint: ['', Validators.required],
      secondSemesterPoint: ['', Validators.required],
      thirdSemesterPoint: ['', Validators.required],

      pgpa: ['', Validators.required],
      cgpa: ['', Validators.required],
      systemUser: this.fb.group({
        id: [null, [Validators.required]]
      })
    });
    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEnrolledStudent();
    this.id = new FormControl();
    this.deleteForm = new FormGroup({
      id: this.id
    });
  }

  loadEnrolledStudent() {
    this.enrolStudentService.getEnrolledStudent()
      .subscribe(res => {
          console.log('enroll res = ', res)
          this.listOfStudentData = res._embedded.enrollDtoes;
        },
        error => {
          console.log('error=', error);
        })
  }
open(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateEnrolledStudentComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} EnrolledStudent`,
      nzWidth:400,
      nzContent: CreateUpdateEnrolledStudentComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadEnrolledStudent()
    })
  }

  close(): void {
    this.visibleDrawer = false;
    this.visibleEditDrawer = false;
  }


  // forms inside drawer


  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addStudentForm.reset();
    for (const key in this.addStudentForm.controls) {
      if (this.addStudentForm.controls.hasOwnProperty(key)) {
        this.addStudentForm.controls[key].markAsPristine();
        this.addStudentForm.controls[key].updateValueAndValidity();
      }
    }
  }

  ngAfterContentChecked(): void {
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    // @ts-ignore
    this.listOfStudentData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }




  confirm(id: number) {
    console.log('id=', id)
    this.enrolStudentService.deleteStudent(id).subscribe(
      data => {
        this.successMessage = data + ' is added successfully';

      },
      error => {
        this.errorMessage = error
      }
    )
  }

  cancel() {

  }

}



