import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RolesService} from '../../services/roles.service';
import {Roles} from '../../model/Roles';
import {NzDrawerRef, NzDrawerService} from 'ng-zorro-antd/drawer';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CreateUpdateRoleComponent} from './create-update-role/create-update-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
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
  roles: Roles[] = [];
  listOfRoleData: any;

  constructor(
    private notification: NzNotificationService,
    private rolesService: RolesService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this.loadRoles();
  }


  openDrawer(id: number): void {
    const drawerRef = this.drawerService.create<CreateUpdateRoleComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Role`,
      nzWidth:400,
      nzContent: CreateUpdateRoleComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadRoles()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadRoles(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.loading = true;
    this.rolesService.getRoles(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        console.log(res)
        this.loading = false;
        this.roles = res._embedded.rolesDTOes;
        this.totalElements = res.page.totalElements;
        this.filterRoles();
      },
      error => {
        console.log("error = ", error)
      }
    )

  }

  searchRoles(): void {
    this.visible = false;
    this.roles = this.listOfData.filter(
      (item: Roles) => item.name.indexOf(this.searchValue) !== -1);
  }

  filterRoles() {
    for (const item of this.roles) {
      const variable = {
        id: item.id,
        name: item.name
      }
      this.listOfData.push(variable);
      this.listOfRoleData = [...this.listOfData];
    }
  }

  resetBusiness(): void {
    this.searchValue = '';
    this.searchRoles();
  }

  deleteRole(id?: number) {
    this.rolesService.deleteRoles(id).subscribe(
      (data) => {
        this.loadRoles();
        this.createNotification(
          'success',
          'Role',
          'Role Successfully Deleted'
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
    this.roles = this.listOfData.filter(
      (item: Roles) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
