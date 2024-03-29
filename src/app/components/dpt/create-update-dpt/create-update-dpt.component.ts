import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../../services/department.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize} from "rxjs/operators";
import {DptService} from "../../../services/dpt.service";
import {CertificationService} from "../../../services/certificationervice.service";
import {ProgramTypeService} from "../../../services/program-type.service";
import {Certification} from "../../../model/certification";
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
  programs: Certification[];
  certifications: ProgramType[];
  @Input() value: number;
  dptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dptService: DptService,
    private departmentService: DepartmentService,
    private certificationService: CertificationService,
    private programTypeService: ProgramTypeService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.dptForm = this.fb.group({
      department: this.fb.group({id: ['', [Validators.required]]}),
      certifications: this.fb.group({id: ['', [Validators.required]]}),
      programs: this.fb.group({id: ['', [Validators.required]]})
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    this.loadCertification();
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
          this.departments = res._embedded.departmentDTOes;
        },
        error => {
          console.log('error=', error);
        })
  }

  loadCertification() {
    this.certificationService.getCertification().subscribe(res => {
          console.log("pro = ", res)
        if(res?._embedded) {
          this.certifications = res._embedded. certificationDTOes;
        }
        },
        error => {
          console.log('error=', error);
        })
  }

  loadProgramsType() {
    this.programTypeService.getProgramsType()
      .subscribe(res => {
        console.log("protype = ", res)
        if(res?._embedded) {
          this.programs = res._embedded?.programDTOes;
        }
    })
  }
}
