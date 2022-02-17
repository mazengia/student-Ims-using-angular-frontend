import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StatusService} from '../../services/status.service';
import {Status} from '../../model/status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent  implements OnInit, AfterContentChecked {
  constructor(private fb: FormBuilder, private statusService: StatusService) {
    this.statusForm = this.fb.group({
      name: ['', [Validators.required, Validators.required]]
    });
    this.deleteForm = this.fb.group({
      id: ['', [Validators.required, Validators.required]]
    });
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.required]]
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
  listOfStatusData: any; // @ts-ignore

  listOfData: DataItem[] = [];
  statusForm: FormGroup;
  deleteForm : FormGroup;
  editForm : FormGroup;
  id : FormControl;

  status:Status[] = [];



  // edit drawer
  visibleEditDrawer = false;

  ngOnInit(): void {
    this.loadRoles(true);
    this.id = new FormControl();
    this.deleteForm =    new FormGroup({
      id: this.id });
  }

  loadRoles(reset:boolean = false)
  {
    this.statusService.getStatus()
      .subscribe(res =>
      {
          this.listOfStatusData = res;
console.log("status = ",res)
      })

  }
  open(): void {
    this.visibleDrawer = true;
  }
  close(): void {
    this.visibleDrawer = false;
  }


  // forms inside drawer

  saveStatus(value: { name: string }): void {
    console.log('value=',value)
    for (const key in this.statusForm.controls) {
      if (this.statusForm.controls.hasOwnProperty(key)) {
        this.statusForm.controls[key].markAsDirty();
        this.statusForm.controls[key].updateValueAndValidity();
      }
    }
    this.statusService.addStatus(value).subscribe(
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
    this.statusForm.reset();
    for (const key in this.statusForm.controls) {
      if (this.statusForm.controls.hasOwnProperty(key)) {
        this.statusForm.controls[key].markAsPristine();
        this.statusForm.controls[key].updateValueAndValidity();
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
    this.listOfStatusData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  editDrawer(id:number): void {
    this.visibleEditDrawer = true;
    this.statusService.findStatusById(id).subscribe(res =>
    {
      this.editObject=res;
    })

  }

  closeEditDrawer(): void {
    this.visibleEditDrawer = false;
  }

  UpdateForm(value: { name: string}): void {
    console.log('id=',this.editObject.id)
    for (const key in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(key)) {
        this.editForm.controls[key].markAsDirty();
        this.editForm.controls[key].updateValueAndValidity();
      }
    }
    this.statusService.updateStatus(this.editObject.id,value).subscribe(
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
    this.statusService.deleteStatus(id).subscribe(
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
