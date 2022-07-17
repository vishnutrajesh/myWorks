import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ListComponent } from './list.component';
import {ArtCollection} from "../../../core/interface/art-collection";
import {ApiService} from "../../../core/services/api.service";
import {delay, of} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SelectComponent} from "../../../core/components/select/select.component";
import {PaginatorComponent} from "../../../core/components/paginator/paginator.component";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: any;
  let artCollection: ArtCollection[]  =  [
    {
      "id": 261904,
      "title": "The Large Saint Sebastian",
      "date_start": 1514,
      "date_end": 1514,
      "place_of_origin": "Germany",
      "artist_title": "Hans Baldung Grien",
      "style_title": null,
      "style_titles": [],
      "material_titles": [
        "ink",
        "laid paper"
      ],
      "image_id": "299c679b-bb1f-d869-bb7f-ecad86ccc382"
    },
    {
      "id": 91610,
      "title": "Vessel with a Relief Depicting a Procession of Deceased Figures",
      "date_start": -100,
      "date_end": 500,
      "place_of_origin": "Moche Valley",
      "artist_title": "Moche",
      "style_title": "moche",
      "style_titles": [
        "moche",
        "mochica",
        "early intermediate period",
        "Pre-Columbian",
        "americas",
        "Arts of the Americas",
        "andean",
        "andes",
        "south american"
      ],
      "material_titles": [
        "ceramic",
        "inorganic material"
      ],
      "image_id": "caf6bcea-1637-8086-b35c-fa6585c3486a"
    },
   ];
  let responseData = {data: artCollection, config: {iiif_url: 'test'}, pagination: {total_pages: 12}};
  beforeEach(async () => {
    service = jasmine.createSpyObj(['getArtCollections']);
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ ListComponent, SelectComponent, PaginatorComponent ],
      providers: [{provide: ApiService, useValue: service}]
    })
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should get collections form api', () => {
    const filterKeys: string[] = ['id','title','date_start','date_end','place_of_origin','image_id','artist_title','style_titles','style_title','material_titles'];
    const params: any = {
      fields: filterKeys.join(','),
      page: 1,
      limit: 50
    }
    service.getArtCollections.withArgs(params).and.returnValue(of(responseData));
    component.getCollectionList();
    delay(1000)
    expect(component.artCollectionList.length).toEqual(2);
  });

  it('should navigate between pages when click on paginator', function () {
    service.getArtCollections.and.returnValue(of(responseData));
    component.navigateToPage({page: 2})
    expect(component.page).toEqual(2)
    expect(service.getArtCollections).toHaveBeenCalled();
  });

  it('should filter art collections based on style title', function () {
    component.artCollectionRef = artCollection;
    component.filterList({value: ['moche']})
    expect(component.artCollectionList.length).toEqual(1)
  });

  it('should sort art collections based on selected term', function () {
    component.artCollectionList = artCollection;
    component.sortBy({value: 'artist_title'})
    expect(component.artCollectionList[0].artist_title).toEqual(artCollection[0].artist_title)
  });


});
