import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ProgramTypeService} from "../../services/program-type.service";
import {ProgramType} from "../../model/programType";
import {CreateUpdateProgramTypeComponent} from "./create-update-program-type/create-update-program-type.component";

@Component({
  selector: 'app-program-type',
  templateUrl: './program-type.component.html',
  styleUrls: ['./program-type.component.scss']
})
export class ProgramTypeComponent implements OnInit {
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
  programsType: ProgramType[] = [];
  listOfProgramsData: any;

  constructor(
    private notification: NzNotificationService,
    private programService: ProgramTypeService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.loadPrograms();
  }


  openDrawer(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateProgramTypeComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Program`,
      nzWidth: 400,
      nzContent: CreateUpdateProgramTypeComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadPrograms()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadPrograms(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.loading = true;
    this.programService.getProgramsType(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        this.loading = false;
        console.log(res)
        this.programsType = res._embedded.programDTOes;
        this.totalElements = res.page.totalElements;
        this.filterPrograms();
      },
      error => {
        console.log("error = ", error)
      }
    )

  }

  searchPrograms(): void {
    this.visible = false;
    this.programsType = this.listOfData.filter(
      (item: ProgramType) => item.name.indexOf(this.searchValue) !== -1);
  }

  filterPrograms() {
    for (const item of this.programsType) {
      const variable = {
        id: item.id,
        name: item.name
      }
      this.listOfData.push(variable);
      this.listOfProgramsData = [...this.listOfData];
    }
  }

  resetBusiness(): void {
    this.searchValue = '';
    this.searchPrograms();
  }

  deletePrograms(id?: number) {
    this.programService.deleteProgramType(id).subscribe(
      (data) => {
        this.loadPrograms();
        this.createNotification(
          'success',
          'Programs',
          'Programs Successfully Deleted'
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
    this.programsType = this.listOfData.filter(
      (item: ProgramType) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
