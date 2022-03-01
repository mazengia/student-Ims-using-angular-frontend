import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Program} from '../../model/program';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ProgramService} from "../../services/program.service";
import {CreateUpdateProgramComponent} from "./create-update-program/create-update-program.component";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
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
  programs: Program[] = [];
  listOfProgramsData: any;

  constructor(
    private notification: NzNotificationService,
    private programService: ProgramService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.loadPrograms();
  }


  openDrawer(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateProgramComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Programs`,
      nzWidth:400,
      nzContent: CreateUpdateProgramComponent,
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
    this.programService.getPrograms(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        this.loading = false;
        console.log(res)
        this.programs = res._embedded.programDTOList;
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
    this.programs = this.listOfData.filter(
      (item: Program) => item.name.indexOf(this.searchValue) !== -1);
  }

  filterPrograms() {
    for (const item of this.programs) {
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
    this.programService.deleteProgram(id).subscribe(
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
    this.programs = this.listOfData.filter(
      (item: Program) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
