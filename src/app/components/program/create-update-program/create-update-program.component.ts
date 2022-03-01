import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {ProgramService} from "../../../services/program.service";

@Component({
  selector: 'app-create-update-program',
  templateUrl: './create-update-program.component.html',
  styleUrls: ['./create-update-program.component.scss']
})
export class CreateUpdateProgramComponent  implements OnInit {
  isAddMode = true;
  loading = false;
  submitted = false;
  @Input() value: number;
  programsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.programsForm = this.fb.group({
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
    if (this.programsForm.invalid) {
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
    this.programService.addProgram(this.programsForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'programs',
            'programs Successfully Created'
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
    for (const key in this.programsForm.controls) {
      if (this.programsForm.controls.hasOwnProperty(key)) {
        this.programsForm.controls[key].markAsDirty();
        this.programsForm.controls[key].updateValueAndValidity();
      }
    }
  }

  private loadProgramsById() {
    this.programService
      .findProgramById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.programsForm.patchValue(res);
        }
      });
  }

  updatePrograms(): void {

    this.resetForm();
    this.programService
      .updateProgram(this.value, this.programsForm.value)
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'programs',
            'programs Successfully Updated'
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
