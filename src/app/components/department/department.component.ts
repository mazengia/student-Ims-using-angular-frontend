import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../services/department.service';
import {Department} from '../../model/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent  implements OnInit, AfterContentChecked {
  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.required]],
      code: ['', [Validators.required, Validators.required]]
    });
    this.deleteForm = this.fb.group({
      id: ['', [Validators.required, Validators.required]]
    });
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.required]],
      code: ['', [Validators.required, Validators.required]]
    });
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
  listOfDepartmentData: any; // @ts-ignore

  listOfData: DataItem[] = [];
  departmentForm: FormGroup;
  deleteForm : FormGroup;
  editForm : FormGroup;
  id : FormControl;

  pageSize = 10;
  pageNumber = 1;
  totalElements = 0;
  department:Department[] = [];
  visibleEditDrawer = false;

  ngOnInit(): void {
    this.loadDepartments(true);
    this.id = new FormControl();
    this.deleteForm =    new FormGroup({
      id: this.id });
  }

  loadDepartments( reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.departmentService.getDepartment(this.pageNumber - 1, this.pageSize)
      .subscribe(res => {
          // console.log(this.listOfDepartmentData)
          this.listOfDepartmentData = res._embedded ;
          // this.listOfDepartmentData = res._embedded;
          this.totalElements = res.page.totalElements;


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
  }


  // forms inside drawer

  saveDepartment(): void {
    for (const key in this.departmentForm.controls) {
      if (this.departmentForm.controls.hasOwnProperty(key)) {
        this.departmentForm.controls[key].markAsDirty();
        this.departmentForm.controls[key].updateValueAndValidity();
      }
    }
    this.departmentService.addDepartment(this.departmentForm.value).subscribe(
      data=>{
        this.successMessage=data+' is added successfully';
      },
      error=> {
        this.errorMessage= error
      }
    )
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.departmentForm.reset();
    for (const key in this.departmentForm.controls) {
      if (this.departmentForm.controls.hasOwnProperty(key)) {
        this.departmentForm.controls[key].markAsPristine();
        this.departmentForm.controls[key].updateValueAndValidity();
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
    this.listOfDepartmentData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  editDrawer(id:number): void {
    this.visibleEditDrawer = true;
    console.log('edited id=',id)
    this.departmentService.findDepartmentById(id).subscribe(
      res => {
      console.log(res)
      this.editObject=res;
      console.log(res)
    },
      error => {
        console.log('error=', error);
      })

  }

  closeEditDrawer(): void {
    this.visibleEditDrawer = false;
  }

  UpdateForm(value: { name: string, code:string}): void {
    console.log('value=',value)
    console.log('id=',this.editObject.id)
    for (const key in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(key)) {
        this.editForm.controls[key].markAsDirty();
        this.editForm.controls[key].updateValueAndValidity();
      }
    }
    this.departmentService.updateDepartment(this.editObject.id,value).subscribe(
      data=>{
        this.successMessage='name whose id'+this.editObject.id+' is updated successfully';
        window.location.reload()
      },
      error=> {
        this.errorMessage= error
      }
    )
  }

  confirm(id:number) {
    console.log('id=',id)
    this.departmentService.deleteDepartment(id).subscribe(
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

