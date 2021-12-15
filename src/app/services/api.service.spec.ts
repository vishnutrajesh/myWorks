import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  const data = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ ApiService ]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user', () => {
    service.addUser(data).subscribe((res: any) => {
      expect(res).toEqual(data);
    });
    const request = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/users`);
    expect(request.request.method).toEqual('POST');
    request.flush(data);
    httpTestingController.verify()
  });


  it('should get users list', () => {
    service.getUsers().subscribe((res: any) => {
      expect(res).toEqual(data);
    });
    const request = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/users`);
    expect(request.request.method).toEqual('GET');
    request.flush(data);
    httpTestingController.verify()
  });

  it('should update user', () => {
    service.update(data).subscribe((res: any) => {
      expect(res).toEqual(data);
    });
    const request = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/users/1`);
    expect(request.request.method).toEqual('PATCH');
    request.flush(data);
    httpTestingController.verify()
  });


  it('should delete user with id 1', () => {
    service.deleteUser(1).subscribe((res: any) => {
      expect(res).toEqual({});
    });
    const request = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/users/1`);
    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpTestingController.verify()
  });

});
