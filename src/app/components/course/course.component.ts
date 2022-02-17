import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../services/course.service';
import {Course} from '../../model/course';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent  implements OnInit, AfterContentChecked {
  constructor(private fb: FormBuilder,  private courseService: CourseService,private departmentService:DepartmentService) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.required]],
      code: ['', [Validators.required, Validators.required]],
      creditHour: ['', [Validators.required, Validators.required]],
      ects: ['', [Validators.required, Validators.required]],
      departmentId: ['', [Validators.required, Validators.required]]
    });
    this.deleteForm = this.fb.group({
      id: ['', [Validators.required, Validators.required]]});
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.required]]});
  }
  searchValue = '';
  visible = false;
  visibleDrawer = false;
  isModalVisible = false;
  isConfirmLoading = false;

  editObject:any
  successMessage:any;
  errorMessage:any;
  allUserData: any;
  listOfDepartmentData:any;
  listOfCourseData: any; // @ts-ignore

  listOfDepartment: DataItem[] = [];// @ts-ignore
  listOfCourse: DataItem[] = [];
  courseForm: FormGroup;
  deleteForm : FormGroup;
  editForm : FormGroup;
  id : FormControl;
  pageSize = 10;
  pageNumber = 1;
  totalElements = 0;
  course:Course[] = [];
  visibleEditDrawer = false;

  ngOnInit(): void {
    this.loadCourse(true);
    this.loadDepartments( );
    this.id = new FormControl();
    this.deleteForm =    new FormGroup({
      id: this.id });
  }
  loadDepartments( )
  {
    this.departmentService.getDepartment()
      .subscribe(res =>
      {console.log("dpt= ",res)
          this.listOfDepartmentData = res;
      },
        error => {
          console.log('error=', error);
        });

  }
  loadCourse( reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.courseService.getCourse(this.pageNumber - 1, this.pageSize)
      .subscribe(res =>{
          console.log("embeded= ",res )
          // console.log("page= ",res.page)
          this.listOfCourseData = res._embedded.courseDTOList ;
          this.totalElements = res.page.totalElements;
      },
        error => {
          console.log('error=', error);
        });
  }
  open(): void {
    this.visibleDrawer = true;
  }
  close(): void {
    this.visibleDrawer = false;
  }


  // forms inside drawer
  saveCourse(value: any): void {
    console.log('value=',value )
    const formInput = {
      name:value.name,
      code:value.code,
      creditHour: value.creditHour,
      ects: value.ects,
      department: {id:value.departmentId}
    }
    console.log('formInput=',formInput)
    for (const key in this.courseForm.controls) {
      if (this.courseForm.controls.hasOwnProperty(key)) {
        this.courseForm.controls[key].markAsDirty();
        this.courseForm.controls[key].updateValueAndValidity();
      }
    }
    this.courseService.addCourse(formInput).subscribe(
      data=>{
        this.successMessage=data+' is added successfully';
      },
      error => {
        console.log('error=', error);
      }  );
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.courseForm.reset();
    for (const key in this.courseForm.controls) {
      if (this.courseForm.controls.hasOwnProperty(key)) {
        this.courseForm.controls[key].markAsPristine();
        this.courseForm.controls[key].updateValueAndValidity();
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
    this.listOfCourseData = this.listOfDepartment.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  editDrawer(id:number): void {
    this.visibleEditDrawer = true;
    console.log("id=",id)
    this.courseService.findCourseById(id).subscribe(
      res =>{
        console.log("edit id ",this.editObject)
      this.editObject=res;
    },
      error => {
        console.log('error=', error);
      });

  }

  closeEditDrawer(): void {
    this.visibleEditDrawer = false;
  }

  UpdateForm(value: { name: string}): void {
    console.log('value=',value)
    console.log('id=',this.editObject.id)
    for (const key in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(key)) {
        this.editForm.controls[key].markAsDirty();
        this.editForm.controls[key].updateValueAndValidity();
      }
    }
    this.courseService.updateCourse(this.editObject.id,value).subscribe(
      data=>{
        this.successMessage='name whose id'+this.editObject.id+' is updated successfully';
        window.location.reload()
      },
      error => {
        console.log('error=', error);
      } );
  }

  confirm(id:number) {
    console.log('id=',id)
    this.courseService.deleteCourse(id).subscribe(
      data=>{
        this.successMessage=data+' is added successfully';
      },
      error=> {
        this.errorMessage= error
      }
    )
  }

  cancel() {

  }
}

