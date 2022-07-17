import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = environment.baseURI; /* base url */
  constructor(private http: HttpClient) { }
  /* API Request function */
  getArtCollections(params: any): Observable<any> {
    return this.http.get(this.url, {params: params})
  }
}
