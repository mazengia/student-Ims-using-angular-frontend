import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Status} from "../../model/status";
import {StatusService} from "../../services/status.service";
import {CreateUpdateStatusComponent} from "./create-update-status/create-update-status.component";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
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
  loading = true;
  // @ts-ignore
  listOfData: DataItem[] = [];
  statuses: Status[] = [];
  listOfStatusData: any;

  constructor(
    private notification: NzNotificationService,
    private statusService: StatusService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.loadStatus();
  }


  openDrawer(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateStatusComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Status`,
      nzContent: CreateUpdateStatusComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadStatus()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadStatus(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.loading = true;
    this.statusService.getStatus(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        console.log(res)
        this.loading = false;
        this.statuses = res._embedded.statusDTOes;
        this.totalElements = res.page.totalElements;
        this.filterStatus();
      },
      error => {
        console.log("error = ", error)
      }
    )

  }

  searchStatus(): void {
    this.visible = false;
    this.statuses = this.listOfData.filter(
      (item: Status) => item.name.indexOf(this.searchValue) !== -1);
  }

  filterStatus() {
    for (const item of this.statuses) {
      const variable = {
        id: item.id,
        name: item.name
      }
      this.listOfData.push(variable);
      this.listOfStatusData = [...this.listOfData];
    }
  }

  resetBusiness(): void {
    this.searchValue = '';
    this.searchStatus();
  }

  deleteStatus(id?: number) {
    this.statusService.deleteStatus(id).subscribe(
      (data) => {
        this.loadStatus();
        this.createNotification(
          'success',
          'Status',
          'Status Successfully Deleted'
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
    this.statuses = this.listOfData.filter(
      (item: Status) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
