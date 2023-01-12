import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable, pluck, Subject, switchMap} from "rxjs";
import {TransferStateService} from "@scullyio/ng-lib";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private subject = new Subject();
  obs$ = this.subject.asObservable();
  url: string = environment.baseURI; /* base url */
  private testData: boolean = false;
  constructor(private http: HttpClient,
              private ar: ActivatedRoute,
              private transferStateService: TransferStateService) { }
  /* API Request function */
  getArtDetails(ar: ActivatedRoute) {
    return this.transferStateService.useScullyTransferState(
      'details',
      ar.params.pipe(
        pluck('id'),
        switchMap(id => this.http.get(this.url + `/${id}`))
      )
      )
  }
  getArtCollections(params: any, paginate?: boolean): Observable<any> {
    if(paginate) {
      return this.http.get(this.url, {params: params})
    } else {
      return this.transferStateService.useScullyTransferState('artCollections', this.http.get(this.url, {params: params}))
    }
  }

  setValue() {
    this.obs$.subscribe((data: any) => {
      this.testData = data;
    })
  }

  trigger() {
    this.subject.next(true);
  }

  getData() {
    return this.testData;
  }
}
