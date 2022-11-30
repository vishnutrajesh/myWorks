import {Component, OnInit} from '@angular/core';
import {SharedService} from "./core/services/shared/shared.service";
import {Observable} from "rxjs";
import {ApiService} from "./core/services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loaderObservable$: Observable<boolean> | undefined;
  articles: any;
  constructor(private sharedService: SharedService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loaderObservable$ = this.sharedService.httpRequestLoader.asObservable();
    this.getPost();
  }

  getPost() {
    this.apiService.getPosts({}).subscribe((data: any) => {
      this.articles = data.articles;
    })
  }

}
