import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../../services/department.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {DepartmentResponse} from "../../../model/department";
import {ProgramResponse} from "../../../model/program";
import {ProgramTypeResponse} from "../../../model/programType";
import {DptService} from "../../../services/dpt.service";
import {ProgramService} from "../../../services/program.service";
import {ProgramTypeService} from "../../../services/program-type.service";

@Component({
  selector: 'app-create-update-dpt',
  templateUrl: './create-update-dpt.component.html',
  styleUrls: ['./create-update-dpt.component.scss']
})
export class CreateUpdateDptComponent implements OnInit {
  isAddMode = true;
  loading = false;
  submitted = false;
  listOfDepartmentData: any;
  listOfProgramData: any;
  listOfProgramTypeData: any;
  @Input() value: number;
  DptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dptService: DptService,
    private departmentService: DepartmentService,
    private programService: ProgramService,
    private programTypeService: ProgramTypeService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.DptForm = this.fb.group({
      department: this.fb.group({id: ['', [Validators.required]]}),
      programType: this.fb.group({id: ['', [Validators.required]]}),
      programs: this.fb.group({id: ['', [Validators.required]]})
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    this.loadDepartments();
    this.loadPrograms();
    this.loadProgramsType();
    if (this.value) {
      this.loadDptById();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.DptForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.saveDepartment();
    } else {
      this.updateDpt();
    }
  }

  saveDepartment(): void {
    this.resetForm();
    this.dptService.addDpt(this.DptForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Dpt',
            'Dpt Successfully Created'
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

  resetForm(): void {
    for (const key in this.DptForm.controls) {
      if (this.DptForm.controls.hasOwnProperty(key)) {
        this.DptForm.controls[key].markAsDirty();
        this.DptForm.controls[key].updateValueAndValidity();
      }
    }
  }

  private loadDptById() {
    this.dptService
      .findDptById(this.value)
      .pipe(first())
      .subscribe((res) => {
        console.log(res)
        if (!this.isAddMode) {
          this.DptForm.patchValue(res);
        }
      });
  }

  updateDpt(): void {

    this.resetForm();
    this.dptService
      .updateDpt(this.value, this.DptForm.value)
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Dpt',
            'Dpt Successfully Updated'
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

  loadDepartments() {
    this.departmentService.getDepartment().subscribe(
      res => {
        this.listOfDepartmentData = res._embedded.departmentDTOList;
      },
      error => {
        console.log('error=', error);
      })
  }

  loadPrograms() {
    this.programService.getPrograms().subscribe(
      res => {
        this.listOfProgramData = res._embedded.programDTOList;
      },
      error => {
        console.log('error=', error);
      })
  }

  loadProgramsType() {
    this.programTypeService.getProgramsType().subscribe(res => {
      this.listOfProgramTypeData = res._embedded.programTypeDTOList;
    })
  }
}
