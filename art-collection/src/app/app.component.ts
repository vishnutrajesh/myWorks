import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SharedService} from "./core/services/shared/shared.service";
import {Observable} from "rxjs";
import {ApiService} from "./core/services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('scroll') scrollView: ElementRef | undefined;
  size: number = 30;
  page: number = 1;
  loaderObservable$: Observable<boolean> | undefined;
  articles: any;
   error: any;
  constructor(private sharedService: SharedService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loaderObservable$ = this.sharedService.httpRequestLoader.asObservable();
    this.getPost();
  }

  getPost() {
    const params: any = {
      pageSize: this.size,
      page: this.page
    }
    this.apiService.getPosts(params).subscribe((data: any) => {
      this.articles = data.articles;
      this.error = null;
    }, error => {
      this.error = error.error;
      console.log(this.error);
    })
  }

  navigatePage($event: any) {
    let pos = this.scrollView?.nativeElement.scrollTop + this.scrollView?.nativeElement.offsetHeight;
    let max = this.scrollView?.nativeElement.scrollHeight;
    if(pos === max || pos >= max )   {
      if (this.scrollView?.nativeElement?.scrollTop) {
        this.scrollView.nativeElement.scrollTop = 0;
      }
      this.page += 1;
      this.getPost()
    }
  }
}
