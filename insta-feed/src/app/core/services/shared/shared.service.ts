import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  httpRequestLoader = new BehaviorSubject(false)
  constructor() { }
}
