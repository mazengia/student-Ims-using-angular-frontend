import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../services/student.service';
import {DptService} from '../../services/dpt.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, AfterContentChecked {
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
  listOfDptData: any;// @ts-ignore
  listOfData: DataItem[] = [];
  addStudentForm: FormGroup;
  deleteForm: FormGroup;
  editForm: FormGroup;
  id: FormControl;
  visibleEditDrawer = false;

  pageSize = 10;
  pageNumber =1;
  totalElements = 0;
  constructor(private fb: FormBuilder, private studentService: StudentService, private dptService: DptService) {

    this.addStudentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      dpt: this.fb.group({
        id: [null, [Validators.required]]
      }),
      email: ['', Validators.required],
      username: ['', Validators.required]
    });
    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDpt();
    this.loadStudent();
    this.id = new FormControl();
    this.deleteForm = new FormGroup({
      id: this.id
    });
  }

  loadStudent(reset: boolean = false) {
    if (reset) {
    this.pageNumber = 1;
  }
    this.studentService.getStudent(this.pageNumber - 1, this.pageSize)
      .subscribe(res => {
          this.listOfStudentData = res.content
          console.log('res = ', res)
        },
        error => {
          console.log('error=', error);
        })
  }

  loadDpt() {
    this.dptService.getDpt()
      .subscribe(res => {
          this.listOfDptData = res;
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

  saveStudent(): void {
    for (const key in this.addStudentForm.controls) {
      if (this.addStudentForm.controls.hasOwnProperty(key)) {
        this.addStudentForm.controls[key].markAsDirty();
        this.addStudentForm.controls[key].updateValueAndValidity();
      }
    }
    console.log(this.addStudentForm.value)
    this.studentService.addStudent(this.addStudentForm.value).subscribe(
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
    this.studentService.findStudentById(id).subscribe(
      res => {
        this.editObject = res ;
        console.log("edit by Id",res)
      },
      error => {
        console.log('error=', error);
      })

  }


  UpdateForm(value: { firstName: string, userName: string }): void {
    console.log('value=', value)
    console.log('id=', this.editObject.id)
    for (const key in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(key)) {
        this.editForm.controls[key].markAsDirty();
        this.editForm.controls[key].updateValueAndValidity();
      }
    }
    this.studentService.updateStudent(this.editObject.id, value).subscribe(
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
    this.studentService.deleteStudent(id).subscribe(
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

