import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProgramService} from '../../services/program.service';
import {Program} from '../../model/program';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent    implements OnInit, AfterContentChecked {
  constructor(private fb: FormBuilder, private programService: ProgramService) {
    this.addForm = this.fb.group({
      name: ['',Validators.required]
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

  editObject:any
  successMessage:any;
  errorMessage:any;
  allUserData: any;
  listOfProgramsData: any; // @ts-ignore

  listOfData: DataItem[] = [];
  addForm: FormGroup;
  deleteForm : FormGroup;
  editForm : FormGroup;
  id : FormControl;
  programs:Program[] = [];
  visibleEditDrawer = false;

  ngOnInit(): void {
    this.loadPrograms( );
    this.id = new FormControl();
    this.deleteForm =    new FormGroup({
      id: this.id });
  }

  loadPrograms( )
  {
    this.programService.getPrograms()
      .subscribe(res =>
      {
          this.listOfProgramsData =res
      })

  }
  open(): void {
    this.visibleDrawer = true;
  }
  close(): void {
    this.visibleDrawer = false;
  }


  // forms inside drawer

  saveProgram(value: { name: string }): void {
    console.log('value=',value)
    for (const key in this.addForm.controls) {
      if (this.addForm.controls.hasOwnProperty(key)) {
        this.addForm.controls[key].markAsDirty();
        this.addForm.controls[key].updateValueAndValidity();
      }
    }
    this.programService.addProgram(value).subscribe(
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
    this.addForm.reset();
    for (const key in this.addForm.controls) {
      if (this.addForm.controls.hasOwnProperty(key)) {
        this.addForm.controls[key].markAsPristine();
        this.addForm.controls[key].updateValueAndValidity();
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
    this.listOfProgramsData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  editDrawer(id:number): void {
    this.visibleEditDrawer = true;
    this.programService.findProgramById(id).subscribe(
      res => {
      this.editObject=res;
    })

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
    this.programService.updateProgram(this.editObject.id,value).subscribe(
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
    this.programService.deleteProgram(id).subscribe(
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
