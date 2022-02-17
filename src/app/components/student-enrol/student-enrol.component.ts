import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../services/student.service';
import {DptService} from '../../services/dpt.service';
import {EnrolStudentService} from '../../services/enrolStudent.service';

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
  constructor(private fb: FormBuilder, private studentService:StudentService ,private enrolStudentService:EnrolStudentService) {

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
    this.loadStatus();
    this.loadEnrolledStudent();
    this.loadStudent();
    this.id = new FormControl();
    this.deleteForm = new FormGroup({
      id: this.id
    });
  }

  loadEnrolledStudent() {
    this.enrolStudentService.getStudent()
      .subscribe(res => {
          this.listOfStudentData = res;
          console.log('res = ', res)
        },
        error => {
          console.log('error=', error);
        })
  }
  loadStudent() {
    this.studentService.getStudent()
      .subscribe(res => {
          this.listOfStudent = res.content;
          console.log('student = ', res.content)
        },
        error => {
          console.log('error=', error);
        })
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

  open(): void {
    this.visibleDrawer = true;
  }

  close(): void {
    this.visibleDrawer = false;
    this.visibleEditDrawer = false;
  }


  // forms inside drawer

  enrollStudent(): void {
    for (const key in this.addStudentForm.controls) {
      if (this.addStudentForm.controls.hasOwnProperty(key)) {
        this.addStudentForm.controls[key].markAsDirty();
        this.addStudentForm.controls[key].updateValueAndValidity();
      }
    }
    console.log(this.addStudentForm.value)
    this.enrolStudentService.enrolStudent(this.addStudentForm.value).subscribe(
      data => {
        console.log(data);
        this.successMessage = data + ' is added successfully';
      },
      error => {
        this.errorMessage = error
      }
    )
  }

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

  editDrawer(id: number): void {
    this.visibleEditDrawer = true;
    console.log('edited id=', id)
    this.enrolStudentService.findStudentById(id).subscribe(
      res => {
        this.editObject = res ;
        console.log(res)
      },
      error => {
        console.log('error=', error);
      })

  }


  UpdateForm(value: { name: string, code: string }): void {
    console.log('value=', value)
    console.log('id=', this.editObject.id)
    for (const key in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(key)) {
        this.editForm.controls[key].markAsDirty();
        this.editForm.controls[key].updateValueAndValidity();
      }
    }
    this.enrolStudentService.updateStudent(this.editObject.id, value).subscribe(
      data => {
        this.successMessage = 'name whose id' + this.editObject.id + ' is updated successfully';
        window.location.reload()
      },
      error => {
        this.errorMessage = error
      }
    )
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



