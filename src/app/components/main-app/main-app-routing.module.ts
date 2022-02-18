import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainAppComponent} from './main-app.component';
import {RolesComponent} from "../roles/roles.component";
import {DepartmentComponent} from "../department/department.component";
import {StudentComponent} from "../student/student.component";
import {CourseComponent} from "../course/course.component";
import {StatusComponent} from "../status/status.component";
import {ProgramComponent} from "../program/program.component";
import {ProgramTypeComponent} from "../program-type/program-type.component";
import {DptComponent} from "../dpt/dpt.component";
import {StudentEnrolComponent} from "../student-enrol/student-enrol.component";

const routes: Routes = [
  {path: '', component: MainAppComponent},
  {
    path: 'main-app',
    component: MainAppComponent,
    children: [
      {path: 'role', component: RolesComponent},
      {path: 'department', component: DepartmentComponent},
      {path: 'student', component: StudentComponent},
      {path: 'course', component: CourseComponent},
      {path: 'status', component: StatusComponent},
      {path: 'program', component: ProgramComponent},
      {path: 'program-type', component: ProgramTypeComponent},
      {path: 'dpt', component: DptComponent},
      {path: 'student-enroll', component: StudentEnrolComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule {
}
