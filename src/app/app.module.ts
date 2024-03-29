import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginModule} from './components/login/login.module';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import {en_US, NZ_I18N} from "ng-zorro-antd/i18n";
import {MainAppModule} from "./components/main-app/main-app.module";
import {authInterceptorProviders} from "./config/auth.interceptor";
import { CreateUpdateEnrolledStudentComponent } from './components/student-enrol/create-update-enrolled-student/create-update-enrolled-student.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputModule} from "ng-zorro-antd/input";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    CreateUpdateEnrolledStudentComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LoginModule,
        MainAppModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzIconModule,
        NzMenuModule,
        NzToolTipModule,
        NzFormModule,
        NzSelectModule,
        NzInputModule
    ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    authInterceptorProviders
  ],

  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {
}

// @ts-ignore
