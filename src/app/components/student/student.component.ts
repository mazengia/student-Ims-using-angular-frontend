import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Student} from "../../model/student";
import {StudentService} from "../../services/student.service";
import {CreateUpdateStudentComponent} from "./create-update-student/create-update-student.component";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
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
  students: Student[];
  listOfStudentData: any;

  constructor(
    private notification: NzNotificationService,
    private studentService: StudentService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.loadStudent();
  }


  openDrawer(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateStudentComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Student`,
      nzWidth:550,
      nzContent: CreateUpdateStudentComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadStudent()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadStudent(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.studentService.getStudent(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        console.log("student = ",res)
        this.students = res._embedded.userDtoes;
        this.totalElements = res.page.totalElements;
        this.filterStudent();
        this.isDataFound = true;
      },
      error => {
        console.log("error = ", error)

        this.createNotification(
          'error',
          'Error',
          error.error.apierror.message
        );
        this.isDataFound = false;
      }
    )

  }

  searchStudents(): void {
    this.visible = false;
    this.students = this.listOfData.filter(
      (item: Student) => item.username.indexOf(this.searchValue) !== -1);
  }

  filterStudent() {
    for (const item of this.students) {
      const variable = {
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        username: item.username
      }
      this.listOfData.push(variable);
      this.listOfStudentData = [...this.listOfData];
    }
  }

  resetBusiness(): void {
    this.searchValue = '';
    this.searchStudents();
  }

  deleteStudent(id?: number) {
    this.studentService.deleteStudent(id).subscribe(
      (data) => {
        this.loadStudent();
        this.createNotification(
          'success',
          'Student',
          'Student Successfully Deleted'
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
    this.students = this.listOfData.filter(
      (item: Student) => item.username.indexOf(this.searchValue) !== -1
    );
  }
}
