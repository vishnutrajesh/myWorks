import {Component, OnInit} from '@angular/core';
import { DataService, Message } from '../services/data.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  formGroup: FormGroup;
  year: any = 5;
  month: any =10;
  constructor(private data: DataService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required)
    })
  }

  calculate() {
    const startDate = new Date(this.formGroup.get('startDate').value);
    const endDate = new Date(this.formGroup.get('endDate').value);
    // const diff = Math.floor(endDate.getTime() - startDate.getTime());
    // const day = 1000 * 60 * 60 * 24;
    // const months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    // const days = Math.floor(diff/day);
    // // const months = Math.floor(days/31);
    // const years = Math.floor(months/12);
    // this.month = months;
    // this.year = Math.floor(this.month/12);
    let yearsDiff = (d1, d2) => {
      let date1 = new Date(d1);
      let date2 = new Date(d2);
      let yearsDiff =  date2.getFullYear() - date1.getFullYear();
      return yearsDiff;
    }
    let date1 = new Date(startDate);
    let date2 = new Date(endDate);
    let years = yearsDiff(date1, date2);
    let months =(years * 12) + (date2.getMonth() - date1.getMonth()) ;
    this.month = months % 12;
    this.year = Math.floor(months/12)
  }
}
