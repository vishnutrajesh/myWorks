import {Component, OnInit} from '@angular/core';
import {SharedService} from "./core/services/shared/shared.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loaderObservable$: Observable<boolean> | undefined;
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.loaderObservable$ = this.sharedService.httpRequestLoader.asObservable();
  }

}
