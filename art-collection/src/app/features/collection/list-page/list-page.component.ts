import { Component, OnInit } from '@angular/core';
import {ArtCollection} from "../../../core/interface/art-collection";
import {of, Subscription, switchMap} from "rxjs";
import {ApiService} from "../../../core/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TransferStateService} from "@scullyio/ng-lib";

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  /* API Params for filter data */
  filterKeys: string[] = ['id','title','date_start','date_end','place_of_origin','image_id','artist_title','style_titles','style_title','material_titles'];
  page: number = 1;
  size: number = 50;
  totalCount: number = 0;
  artCollectionList: ArtCollection[] = []
  artCollectionRef: ArtCollection[] = []
  apiSubscription: Subscription | undefined;
  imageUrl: string = '';
  styleTitles: any = [];
  sortEnums: any = [
    {label: 'Name', value: 'title'},
    {label: 'Artist', value: 'artist_title'},
    {label: 'Date', value: 'date_start'},
  ]
  styleFilter: any;
  sort: any;
  constructor(private apiService: ApiService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private tss: TransferStateService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((x: any) => {
      this.page =  x['no'];
      this.getCollectionList();
    })
  }
  /* Method for getting data from API */
  getCollectionList(paginate?: boolean) {
    const params: any = {
      fields: this.filterKeys.join(','),
      page: this.page,
      limit: this.size
    }
    this.tss.useScullyTransferState('getAllPages', of(100).pipe(
      switchMap((page) => this.apiService.getArtCollections({page: page, ...params}))
    )).subscribe((list: any) => {
      this.imageUrl = list.config.iiif_url;
      this.totalCount = list.pagination.total_pages;
      this.artCollectionList = list.data;
      this.artCollectionRef = list.data;
    });
  }

  ngOnDestroy(): void {
    /* Unsubscribing observable to prevent memory leak */
    if(this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
  /* trackBy for performance optimization */
  listTrackBy(index: number, item: any) {
    return item.id;
  }
  /* Paginator function */
  navigateToPage($event: any) {
    this.page = $event.page;
    this.styleFilter = null;
    this.router.navigate([`/page/${this.page}`])
  }
  /* Function to filter */
  filterList($event: any) {
    if($event.value instanceof Array) {
      let arr:any = [];
      if($event.value.length > 0) {
        $event.value.forEach((titles: string) => {
          arr.push(this.artCollectionRef.filter((list: any) => list['style_titles'].includes(titles)));
        })
        this.artCollectionList = arr.flat();
      } else {
        this.artCollectionList = this.artCollectionRef;
      }
    } else{
      this.artCollectionList = this.artCollectionRef.filter((list: any) => list['style_titles'].includes($event.value))
    }
    if (this.sort) {
      this.sortBy({value: this.sort})
    }
  }
  /* Function to sort */
  sortBy($event: any) {
    if($event.value === 'date_start') {
      this.artCollectionList = this.artCollectionList.sort((a: any, b: any) => a[$event.value] - b[$event.value])
    } else {
      this.artCollectionList = this.artCollectionList.sort((a: any, b: any) => {
        if(a[$event.value] < b[$event.value]) { return -1; }
        if(a[$event.value] > b[$event.value]) { return 1; }
        return 0;
      })
    }
  }

  navigateToDetails(id: any) {
    this.router.navigate([`art/${id}`])
  }
}
