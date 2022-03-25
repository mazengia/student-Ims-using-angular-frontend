import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
 import {CourseService} from '../../services/course.service';
import {Course} from '../../model/course';
 import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CreateUpdateCourseComponent} from "./create-update-course/create-update-course.component";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent  implements OnInit {
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
  courses: Course[];
  listOfCourseData: any;

  constructor(
    private notification: NzNotificationService,
    private courseService: CourseService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.loadCourse();
  }


  openDrawer(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateCourseComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Course`,
      nzWidth:400,
      nzContent: CreateUpdateCourseComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadCourse()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadCourse(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.loading = true;
    this.courseService.getCourse(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        this.loading = false;
        this.courses = res._embedded.courseDTOList;
        this.totalElements = res.page.totalElements;
        this.filterCourse();
      },
      error => {
        console.log("error = ", error)
      }
    )

  }

  searchCourse(): void {
    this.visible = false;
    this.courses = this.listOfData.filter(
      (item: Course) => item.name.indexOf(this.searchValue) !== -1);
  }

  filterCourse() {
    for (const item of this.courses) {
      const variable = {
        id: item.id,
        name: item.name
      }
      this.listOfData.push(variable);
      this.listOfCourseData = [...this.listOfData];
    }
  }

  resetBusiness(): void {
    this.searchValue = '';
    this.searchCourse();
  }

  deleteCourse(id?: number) {
    this.courseService.deleteCourse(id).subscribe(
      (data) => {
        this.loadCourse();
        this.createNotification(
          'success',
          'Course',
          'Course Successfully Deleted'
        );
      },
      (error) => {
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
    this.courses = this.listOfData.filter(
      (item: Course) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
