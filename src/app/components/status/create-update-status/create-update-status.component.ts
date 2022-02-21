import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {StatusService} from "../../../services/status.service";

@Component({
  selector: 'app-create-update-status',
  templateUrl: './create-update-status.component.html',
  styleUrls: ['./create-update-status.component.sass']
})
export class CreateUpdateStatusComponent  implements OnInit {
  isAddMode = true;
  loading = false;
  submitted = false;
  @Input() value: number;
  statusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private statusService: StatusService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.statusForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.loadStatusById();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.statusForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.saveStatus();
    } else {
      this.updateStatus();
    }
  }

  saveStatus(): void {
    this.resetForm();
    this.statusService.addStatus(this.statusForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Status',
            'Status Successfully Created'
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
    for (const key in this.statusForm.controls) {
      if (this.statusForm.controls.hasOwnProperty(key)) {
        this.statusForm.controls[key].markAsDirty();
        this.statusForm.controls[key].updateValueAndValidity();
      }
    }
  }

  private loadStatusById() {
    this.statusService
      .findStatusById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.statusForm.patchValue(res);
        }
      });
  }

  updateStatus(): void {

    this.resetForm();
    this.statusService
      .updateStatus(this.value, this.statusForm.value)
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Status',
            'Status Successfully Updated'
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
