import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DepartmentService} from '../../services/department.service';
import {Department} from '../../model/department';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {CreateUpdateDepartmentComponent} from "./create-update-department/create-update-department.component";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild(
    'drawerTemplate',
    {static: false})
  drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  pageSize = 10;
  pageNumber = 1;
  totalElements = 0;
  searchValue = '';
  visible = false;
  isDataFound = false;
  // @ts-ignore
  listOfData: DataItem[] = [];
  departments: Department[] = [];
  listOfDepartmentData: any;

  constructor(
    private notification: NzNotificationService,
    private departmentService: DepartmentService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.loadDepartments();
  }


  openDrawer(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateDepartmentComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Department`,
      nzWidth: 400,
      nzContent: CreateUpdateDepartmentComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadDepartments()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadDepartments(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.departmentService.getDepartment(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        // console.log(res)
        this.departments = res._embedded.departmentDTOList;
        this.totalElements = res.page.totalElements;
        this.filterDepartments();
        this.isDataFound = true;
      },
      error => {
        console.log("error = ", error)
        this.isDataFound = false;
      }
    )

  }

  searchDepartments(): void {
    this.visible = false;
    // @ts-ignore
    this.departments = this.listOfData.filter(
      (item: Department) => item.name.indexOf(this.searchValue) !== -1);
  }

  filterDepartments() {
    // @ts-ignore
    for (const item of this.departments) {
      const variable = {
        id: item.id,
        name: item.name
      }
      this.listOfData.push(variable);
      this.listOfDepartmentData = [...this.listOfData];
    }
  }

  resetBusiness(): void {
    this.searchValue = '';
    this.searchDepartments();
  }

  deleteDepartment(id?: number) {
    this.departmentService.deleteDepartment(id).subscribe(
      (data) => {
        this.loadDepartments();
        this.createNotification(
          'success',
          'Department',
          'Department Successfully Deleted'
        );
      },
      (error) => {
        console.log(error)
        this.createNotification(
          'error',
          'Error',
          error.error.message
        );
      }
    )
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    // @ts-ignore
    this.departments = this.listOfData.filter(
      (item: Department) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
