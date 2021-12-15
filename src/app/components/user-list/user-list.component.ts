import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: any = [];
  page: number = 0;
  size: number = 5;
  openModal: boolean = false;
  selectedUser: any = {};
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  deletedUser(id: any, i: number) {
    this.apiService.deleteUser(id).subscribe((res: any) => {
      console.log(res)
      this.userList.splice(i, 1);
    }, error => {
      console.log(error.error)
    })
  }

  createUser(user: any) {
    this.apiService.addUser(user).subscribe((res: any) => {
      console.log(res)
      this.userList.push(res);
      this.openModal = false;
    }, error => {
      console.log(error.error)
    })
  }

  updateUser(data: any) {
    this.apiService.update(data).subscribe((res: any) => {
      console.log(res);
      this.openModal = false;
      let index = this.userList.findIndex((x: any) => x.id === this.selectedUser.id);
      this.userList.splice(index, 1, res)
    }, error => {
      console.log(error.error)
    })
  }

  getAllUsers() {
    let params: any = {
      _page: this.page,
      _limit: this.size
    }
    this.apiService.getUsers(params).subscribe((res: any) => {
      this.userList = res;
    }, error => {
      console.log(error.error)
    })
  }

  identify(data: any) {
    return data.id;
  }

  addNewUser() {
  this.openModal = true;
    this.selectedUser = {type: 'create'};
  }

  select(user: any, type: string) {
    this.selectedUser = {...user, type: type};
    this.openModal = true;
  }

  getFormValues($event: any) {
       if($event?.type === 'create') {
         this.createUser({...$event, company: {name: 'Google'}, website: 'google.com'})
       } else if ($event?.type === 'update') {
         this.updateUser({...$event, id: this.selectedUser.id});
       }
  }
}
