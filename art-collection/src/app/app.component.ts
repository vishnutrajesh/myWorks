import {Component, OnInit} from '@angular/core';
import {SharedService} from "./core/services/shared/shared.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loaderObservable$: Observable<boolean> | undefined;
  constructor(private sharedService: SharedService, private router: Router) {}
  filterKeys: string[] = ['id','title','date_start','date_end','place_of_origin','image_id','artist_title','style_titles','style_title','material_titles'];

  ngOnInit(): void {
    this.loaderObservable$ = this.sharedService.httpRequestLoader.asObservable();
  }

  navigateToPage($event: any) {
    this.router.navigate([`/art/${$event.page}`])
  }
}
