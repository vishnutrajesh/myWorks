import { Component, OnInit } from '@angular/core';
import {SharedService} from "../core/services/shared/shared.service";
import {ApiService} from "../core/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-art-details',
  templateUrl: './art-details.component.html',
  styleUrls: ['./art-details.component.scss']
})
export class ArtDetailsComponent implements OnInit {
  list: any;
  imageUrl: any;

  testData: any;

  constructor(private shared: ApiService,
              private router: Router,
              private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.shared.getArtDetails(this.ar).subscribe((data: any) => {
      this.imageUrl = data.config.iiif_url;
      this.list = data.data;
    })
  }

  testFn() {
    this.router.navigate(['/protected'])
  }
}
