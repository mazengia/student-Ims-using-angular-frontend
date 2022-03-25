
import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DptService} from '../../services/dpt.service';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Dpt} from "../../model/dpt";
import {CreateUpdateDptComponent} from "./create-update-dpt/create-update-dpt.component";

@Component({
  selector: 'app-dpt',
  templateUrl: './dpt.component.html',
  styleUrls: ['./dpt.component.scss']
})
export class DptComponent implements  OnInit {
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
  loading= true;
  // @ts-ignore
  listOfData: DataItem[] = [];
  dpts: Dpt[];

  constructor(
    private notification: NzNotificationService,
    private dptService: DptService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.loadDpts();
  }

  loadDpts(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.loading = true;
    this.dptService.getDpt(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        this.loading = false;
        this.dpts = res._embedded.dptDTOList;
        this.totalElements = res.page.totalElements;
        this.filterDpts();
      },
      error => {
        console.log("error = ", error)
      }
    )

  }

  openDrawer(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateDptComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Dpt`,
      nzWidth:400,
      nzContent: CreateUpdateDptComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadDpts()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }



  searchDpts(): void {
    this.visible = false;
    // this.dpts = this.listOfData.filter(
    //   (item: Dpt) => item.name.indexOf(this.searchValue) !== -1);
  }

  filterDpts() {
    // for (const item of this.dpts) {
    //   const variable = {
    //     id: item.id,
    //     name: item.name
    //   }
    //   this.listOfData.push(variable);
    //   this.listOfRoleData = [...this.listOfData];
    // }
  }

  resetBusiness(): void {
    this.searchValue = '';
    this.searchDpts();
  }

  deleteDpt(id?: number) {
    this.dptService.deleteDpt(id).subscribe(
      (data) => {
        this.loadDpts();
        this.createNotification(
          'success',
          'Dpt',
          'Dpt Successfully Deleted'
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
    // this.visible = false;
    // this.dpts = this.listOfData.filter(
    //   (item: Dpt) => item.name.indexOf(this.searchValue) !== -1
    // );
  }
}


