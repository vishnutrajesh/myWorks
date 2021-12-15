import { Component } from '@angular/core';
import {LoaderService} from "./services/loader.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading: Subject<boolean>;
  constructor(public loader: LoaderService) {
    this.isLoading = this.loader.loading;
  }
}
