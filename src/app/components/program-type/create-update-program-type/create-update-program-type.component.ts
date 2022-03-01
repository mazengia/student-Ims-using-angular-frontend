import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
 import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {ProgramTypeService} from "../../../services/program-type.service";

@Component({
  selector: 'app-create-update-program-type',
  templateUrl: './create-update-program-type.component.html',
  styleUrls: ['./create-update-program-type.component.sass']
})
export class CreateUpdateProgramTypeComponent implements OnInit {
  isAddMode = true;
  loading = false;
  submitted = false;
  @Input() value: number;
  programsTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private programService: ProgramTypeService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.programsTypeForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.loadProgramsById();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.programsTypeForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.savePrograms();
    } else {
      this.updatePrograms();
    }
  }

  savePrograms(): void {
    this.resetForm();
    this.programService.addProgramType(this.programsTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'programs type',
            'programs type Successfully Created'
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
    for (const key in this.programsTypeForm.controls) {
      if (this.programsTypeForm.controls.hasOwnProperty(key)) {
        this.programsTypeForm.controls[key].markAsDirty();
        this.programsTypeForm.controls[key].updateValueAndValidity();
      }
    }
  }

  private loadProgramsById() {
    this.programService
      .findProgramTypeById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.programsTypeForm.patchValue(res);
        }
      });
  }

  updatePrograms(): void {

    this.resetForm();
    this.programService
      .updateProgramType(this.value, this.programsTypeForm.value)
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'programs type',
            'programs type Successfully Updated'
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
}
