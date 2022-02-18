import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { MainAppComponent } from './main-app.component';
import {StudentComponent} from "../student/student.component";
import {StudentEnrolComponent} from "../student-enrol/student-enrol.component";
import {CourseComponent} from "../course/course.component";
import {CourseEnrolComponent} from "../course-enrol/course-enrol.component";
import {DepartmentComponent} from "../department/department.component";
import {DptComponent} from "../dpt/dpt.component";
import {ProgramComponent} from "../program/program.component";
import {ProgramTypeComponent} from "../program-type/program-type.component";
import {CreateUpdateProgramComponent} from "../program/create-update-program/create-update-program.component";
import {RolesComponent} from "../roles/roles.component";
import {CreateUpdateRoleComponent} from "../roles/create-update-role/create-update-role.component";
import {StatusComponent} from "../status/status.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {CreateUpdateDepartmentComponent} from "../department/create-update-department/create-update-department.component";


@NgModule({
  declarations: [
    MainAppComponent,
    StudentComponent,
    StudentEnrolComponent,
    CourseComponent,
    CourseEnrolComponent,
    DepartmentComponent,
    CreateUpdateDepartmentComponent,
    DptComponent,
    ProgramComponent,
    ProgramTypeComponent,
    CreateUpdateProgramComponent,
    RolesComponent,
    CreateUpdateRoleComponent,
    StatusComponent,
  ],
  imports: [
    CommonModule,
    MainAppRoutingModule,
    NzLayoutModule,
    NzDropDownModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    NzPopconfirmModule,
    NzToolTipModule,
    NzDrawerModule,
    NzInputModule,
    NzSelectModule
  ]
})
export class MainAppModule { }
