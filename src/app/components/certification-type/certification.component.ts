import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Certification} from '../../model/certification';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CreateUpdateCertificationComponent} from "./create-update-certification/create-update-certification.component";
import {CertificationService} from "../../services/certificationervice.service";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html'
})
export class CertificationComponent implements OnInit {
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
  certification: Certification[] = [];
  listOfCertificationData: any;

  constructor(
    private notification: NzNotificationService,
    private certificationService: CertificationService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.loadCertifications();
  }


  openDrawer(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateCertificationComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Certification`,
      nzWidth:400,
      nzContent: CreateUpdateCertificationComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadCertifications()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadCertifications(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.loading = true;
    this.certificationService.getCertification(this.pageNumber - 1, this.pageSize)
      .subscribe(res => {
        this.loading = false;
        console.log("certificationDTOes",res)
        this.certification = res._embedded.certificationDTOes;
        this.totalElements = res.page.totalElements;
        this.filterCertification();
      },
      error => {
        console.log("error = ", error)
      }
    )

  }

  searchCertification(): void {
    this.visible = false;
    this.certification = this.listOfData.filter(
      (item: Certification) => item.name.indexOf(this.searchValue) !== -1);
  }

  filterCertification() {
    for (const item of this.certification) {
      const variable = {
        id: item.id,
        name: item.name
      }
      this.listOfData.push(variable);
      this.listOfCertificationData = [...this.listOfData];
    }
  }

  resetBusiness(): void {
    this.searchValue = '';
    this.searchCertification();
  }

  deleteCertification(id?: number) {
    this.certificationService.deleteCertification(id).subscribe(
      (data) => {
        this.loadCertifications();
        this.createNotification(
          'success',
          'Certification',
          'Certification Successfully Deleted'
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
    this.certification = this.listOfData.filter(
      (item: Certification) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
