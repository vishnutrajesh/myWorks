import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Observable, of} from "rxjs";
import {By} from "@angular/platform-browser";

describe('UserListComponent', () => {
  const data = [{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }];
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockApiService: any;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj([
      'getUsers',
      'addUser',
      'update',
      'deleteUser'])
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ UserListComponent ],
      providers: [{provide: ApiService, useValue: mockApiService}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    mockApiService.getUsers.and.returnValue(of(data));
    mockApiService.addUser.and.returnValue(of(data));
    mockApiService.update.and.returnValue(of(data));
    mockApiService.deleteUser.and.returnValue(of([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user list', () => {
    mockApiService.getUsers.and.returnValue(of(data));
    const userList: any = fixture.debugElement.queryAll(By.css('.user-list'))
    console.log(userList);
    expect(userList.length).toBeGreaterThan(0);
  });

  it('should open popup when click on create', () => {
    component.addNewUser();
    fixture.detectChanges()
    const popup: any = fixture.debugElement.queryAll(By.css('.overlay-popup'))
    expect(popup).toBeTruthy()
  });

  it('should delete when click on delete icon', () => {
    component.deletedUser(1, 0);
    fixture.detectChanges()
    console.log(component.userList.length);
    expect(component.userList.length).toEqual(0);
  });



});
