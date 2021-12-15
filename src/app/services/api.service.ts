import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = `https://jsonplaceholder.typicode.com/`;
  constructor(private http: HttpClient) { }

  addUser(user: any) { // Adding user to the list
    return this.http.post(`${this.url}users`, user);
  }

  update(user: any) { // update existing user from list
    return this.http.patch(`${this.url}users/${user?.id}`, user);
  }

  deleteUser(id: number) { // delete a user from list
    return this.http.delete(`${this.url}users/${id}`)
  }

  getUsers(param?: any) { // listing all users
    return this.http.get(`${this.url}users`, param? {params: param}: {})
  }
}
