import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  url: string = `https://covidtracking.com/api`;
  constructor(private http: HttpClient) { }
  getCovidStateWise(params: any) {
    return this.http.get(`https://covid-api.mmediagroup.fr/v1/history`, {params})
  }
  getAllCases(param?: any){
    return this.http.get(`https://covid-api.mmediagroup.fr/v1/cases`, {params: param})
  }
  getVaccinationDetails(param?: any) {
    return this.http.get(`https://covid-api.mmediagroup.fr/v1/vaccines`, {params: param})
  }
}
