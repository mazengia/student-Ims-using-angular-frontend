import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainAppRoutingModule} from './main-app-routing.module';
import {MainAppComponent} from './main-app.component';
import {StudentComponent} from "../student/student.component";
import {StudentEnrolComponent} from "../student-enrol/student-enrol.component";
import {CourseComponent} from "../course/course.component";
import {CourseEnrolComponent} from "../course-enrol/course-enrol.component";
import {DepartmentComponent} from "../department/department.component";
import {DptComponent} from "../dpt/dpt.component";
import {CertificationComponent} from "../certification-type/certification.component";
import {ProgramTypeComponent} from "../program-type/program-type.component";
import {
  CreateUpdateCertificationComponent
} from "../certification-type/create-update-certification/create-update-certification.component";
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
import {
  CreateUpdateDepartmentComponent
} from "../department/create-update-department/create-update-department.component";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {CreateUpdateStatusComponent} from "../status/create-update-status/create-update-status.component";
import {CreateUpdateCourseComponent} from "../course/create-update-course/create-update-course.component";
import {CreateUpdateStudentComponent} from "../student/create-update-student/create-update-student.component";
import {CreateUpdateDptComponent} from "../dpt/create-update-dpt/create-update-dpt.component";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {
  CreateUpdateProgramTypeComponent
} from "../program-type/create-update-program-type/create-update-program-type.component";
import {SearchStudentComponent} from 'src/app/components/search-student/search-student.component';


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
    CertificationComponent,
    ProgramTypeComponent,
    CreateUpdateCertificationComponent,
    RolesComponent,
    CreateUpdateRoleComponent,
    StatusComponent,
    CreateUpdateStatusComponent,
    CreateUpdateCourseComponent,
    CreateUpdateStudentComponent,
    CreateUpdateDptComponent,
    SearchStudentComponent,
    CreateUpdateProgramTypeComponent
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
        NzSelectModule,
        NzSpinModule,
        NzDividerModule
    ]
})
export class MainAppModule { }
