import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DptService} from '../../services/dpt.service';
import {DepartmentService} from '../../services/department.service';
import {ProgramService} from '../../services/program.service';
import {ProgramTypeService} from '../../services/program-type.service';

@Component({
  selector: 'app-dpt',
  templateUrl: './dpt.component.html',
  styleUrls: ['./dpt.component.scss']
})
export class DptComponent implements OnInit, AfterContentChecked {
  constructor(private fb: FormBuilder, private dptService: DptService, private departmentService: DepartmentService, private programService: ProgramService, private programTypeService: ProgramTypeService) {
    this.DptForm = this.fb.group({
      departmentId: ['', Validators.required],
      programId: ['', Validators.required],
      programTypeId: ['', Validators.required]
    });
    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      name: ['', Validators.required]
    });

  }

  searchValue = '';
  visible = false;
  visibleDrawer = false;
  isModalVisible = false;
  isConfirmLoading = false;

  editObject: any
  successMessage: any;
  errorMessage: any;
  allUserData: any;
  listOfDepartmentData: any;
  listOfProgramData: any;
  listOfProgramTypeData: any;
  listOfDptData: any; // @ts-ignore
  listOfDepartment: DataItem[] = [];
  DptForm: FormGroup;
  deleteForm: FormGroup;
  editForm: FormGroup;
  id: FormControl;

  visibleEditDrawer = false;

  ngOnInit(): void {
    this.loadDpt();
    this.loadDepartments();
    this.loadPrograms();
    this.loadProgramsType();
    this.id = new FormControl();
    this.deleteForm = new FormGroup({
      id: this.id
    });
  }

  loadDepartments() {
    this.departmentService.getDepartment().subscribe(
      res => {
        this.listOfDepartmentData = res;
      },
      error => {
        console.log('error=', error);
      })
  }

  loadPrograms() {
    this.programService.getPrograms().subscribe(
      res => {
        this.listOfProgramData = res;
      },
      error => {
        console.log('error=', error);
      })
  }

  loadProgramsType() {
    this.programTypeService.getProgramsType().subscribe(res => {
      this.listOfProgramTypeData = res;
    })
  }

  loadDpt() {
    this.dptService.getDpt().subscribe(
      res => {
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

  saveDpt( ): void {
    for (const key in this.DptForm.controls) {
      if (this.DptForm.controls.hasOwnProperty(key)) {
        this.DptForm.controls[key].markAsDirty();
        this.DptForm.controls[key].updateValueAndValidity();
      }
    }
    const sendRequest = {
      // department: { id: this.DptForm.controls.departmentId.value},
      programs: { id: this.DptForm.controls.programId.value},
      programType: {id: this.DptForm.controls.programTypeId.value}
    }
    console.log(sendRequest)
    this.dptService.addDpt(sendRequest)
      .subscribe(data => {
          this.successMessage = data + ' is added successfully';
        },
        error => {
          this.errorMessage = error
        }
      )
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.DptForm.reset();
    for (const key in this.DptForm.controls) {
      if (this.DptForm.controls.hasOwnProperty(key)) {
        this.DptForm.controls[key].markAsPristine();
        this.DptForm.controls[key].updateValueAndValidity();
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
    this.listOfDptData = this.listOfDepartment.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  editDrawer(id: number): void {
    this.visibleEditDrawer = true;
    this.dptService.findDptById(id).subscribe(
      res => {
        this.editObject = res;
      })

  }


  UpdateForm(value: { name: string }): void {
    for (const key in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(key)) {
        this.editForm.controls[key].markAsDirty();
        this.editForm.controls[key].updateValueAndValidity();
      }
    }
    this.dptService.updateDpt(this.editObject.id, value).subscribe(
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
    this.dptService.deleteDpt(id).subscribe(
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

