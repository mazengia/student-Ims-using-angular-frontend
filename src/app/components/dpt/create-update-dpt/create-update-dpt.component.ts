import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../../services/department.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {DptService} from "../../../services/dpt.service";
import {ProgramService} from "../../../services/program.service";
import {ProgramTypeService} from "../../../services/program-type.service";
import {Program} from "../../../model/program";
import {Department} from "../../../model/department";
import {ProgramType} from "../../../model/programType";

@Component({
  selector: 'app-create-update-dpt',
  templateUrl: './create-update-dpt.component.html',
  styleUrls: ['./create-update-dpt.component.scss']
})
export class CreateUpdateDptComponent implements OnInit {
  isAddMode = true;
  loading = false;
  submitted = false;
  departments: Department[];
  programs: Program[];
  programType: ProgramType[];
  @Input() value: number;
  dptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dptService: DptService,
    private departmentService: DepartmentService,
    private programService: ProgramService,
    private programTypeService: ProgramTypeService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.dptForm = this.fb.group({
      department: this.fb.group({id: ['', [Validators.required]]}),
      programType: this.fb.group({id: ['', [Validators.required]]}),
      programs: this.fb.group({id: ['', [Validators.required]]})
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    this.loadPrograms();
    this.loadDepartments();
    this.loadProgramsType();
    if (this.value) {
      this.loadDptById();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.dptForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.saveDpt();
    } else {
      this.updateDpt();
    }
  }

  saveDpt(): void {
    this.resetForm();
    this.dptService.addDpt(this.dptForm.value)
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
    for (const key in this.dptForm.controls) {
      if (this.dptForm.controls.hasOwnProperty(key)) {
        this.dptForm.controls[key].markAsDirty();
        this.dptForm.controls[key].updateValueAndValidity();
      }
    }
  }

  private loadDptById() {
    this.dptService.findDptById(this.value)
      .subscribe((res) => {
          this.dptForm.patchValue(res);
      });
  }

  updateDpt(): void {
    this.resetForm();
    this.dptService
      .updateDpt(this.value, this.dptForm.value)
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
    this.departmentService.getDepartment()
      .subscribe(res => {
          this.departments = res._embedded.departmentDTOList;
        },
        error => {
          console.log('error=', error);
        })
  }

  loadPrograms() {
    this.programService.getPrograms()
      .subscribe(res => {
          console.log("pro = ", res)
          this.programs = res._embedded.programDTOList;
        },
        error => {
          console.log('error=', error);
        })
  }

  loadProgramsType() {
    this.programTypeService.getProgramsType()
      .subscribe(res => {
        console.log("protype = ", res)
      this.programType = res._embedded.programTypeDTOList;
    })
  }
}
