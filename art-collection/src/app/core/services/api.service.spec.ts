import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {ArtCollection} from "../interface/art-collection";

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  let mockCollectionData: ArtCollection[] = [
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
    {
      "id": 104354,
      "title": "Bonbonnière",
      "date_start": 1938,
      "date_end": 1938,
      "place_of_origin": "Wichita",
      "artist_title": "Margret Craver",
      "style_title": "Modernism",
      "style_titles": [
        "Modernism",
        "Art Deco"
      ],
      "material_titles": [
        "silver"
      ],
      "image_id": "cbb422f4-409a-73a9-b0a6-6ece1107704d"
    },
    {
      "id": 76195,
      "title": "Pair of Candelabra",
      "date_start": 1920,
      "date_end": 1921,
      "place_of_origin": "United States",
      "artist_title": "Kalo Shop (Firm)",
      "style_title": "Arts and Crafts Movement",
      "style_titles": [
        "Arts and Crafts Movement",
        "American Arts and Crafts Movement"
      ],
      "material_titles": [
        "silver"
      ],
      "image_id": "d804347a-eada-d3df-96b7-2b528727fe9f"
    }]
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('getArtCollections()', () => {
    it('should return art collections when getArtCollections() is called', (done: DoneFn) => {
      const filterKeys: string[] = ['id','title','date_start','date_end','place_of_origin','image_id','artist_title','style_titles','style_title','material_titles'];
      const params: any = {
        fields: filterKeys.join(','),
        page: 1,
        limit: 50
      }
      service.getArtCollections(params).subscribe((data) => {
        expect(data).toEqual(mockCollectionData);
        done();
      });

      const request = httpTestingController.expectOne(
        environment.baseURI + `?fields=${filterKeys.join(',')}&page=1&limit=50`
      );
      request.flush(mockCollectionData);
      expect(request.request.method).toBe('GET');
    });
  });


  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
