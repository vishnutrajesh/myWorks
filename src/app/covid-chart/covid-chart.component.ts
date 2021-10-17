import { Component, OnInit } from '@angular/core';
import {EChartsOption} from "echarts";
import {FormControl} from "@angular/forms";
import {ApiServiceService} from "../services/api-service.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import * as echarts from 'echarts/types/dist/echarts';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-covid-chart',
  templateUrl: './covid-chart.component.html',
  styleUrls: ['./covid-chart.component.scss']
})
export class CovidChartComponent implements OnInit {
  isLoading: boolean;
  data: any = {
    labels: [],
    data: []
  };
  chartOption: EChartsOption;
  country: FormControl = new FormControl('India');
  countryList: any = [];
  filteredOptions: Observable<string[]>;
  total: any;
  global: boolean;
  nav: any = [{name: 'Deaths', icon: 'summarize'}, {name: 'Vaccination', icon: 'summarize'}];
  selectedNav: string = 'Deaths';
  barChart: EChartsOption;

  constructor(private apiService: ApiServiceService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.filteredOptions = this.country.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.getCountryWiseList();
    this.getAllCases();
    this.getGlobalValues();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countryList.filter((option: any) => option.toLowerCase().includes(filterValue));
  }
  getCountryWiseList() {
    this.isLoading = true;
    this.data.labels = [];
    this.data.data = [];
    const params: any ={
      country: this.country.value,
      status: 'deaths'
    }
    this.apiService.getCovidStateWise(params).subscribe((r: any) => {
      Object.keys(r.All.dates).map((date: any) => {
        return this.data.labels.push(this.datePipe.transform(date, 'MMM d-yy'))
      })
      Object.values(r.All.dates).map((date: any) => {
        return this.data.data.push(date);
      })
      this.chartOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          tooltip: {
            trigger: "axis"
          },
        },
        xAxis: {
          type: 'category',
          data: this.data?.labels,
          axisLine:{ show: false, lineStyle: {color: 'rgb(204,207,208)', type: 'solid'}},
          axisLabel: {color: 'rgb(204,207,208)'},
          splitLine: {show: true, lineStyle: {color: 'rgba(204,207,208, 0.2)', type: 'dashed'}}
        },
        yAxis: {
          type: 'value',
          axisLine:{ show: false, lineStyle: {color: 'rgb(204,207,208)', type: 'solid'}},
          axisLabel: {color: 'rgb(204,207,208)'},
          axisTick: {show: true},
          splitLine: {show: true, lineStyle: {color: 'rgba(204,207,208, 0.2)', type: 'dashed'}}
        },
        series: [
          {
            data: this.data?.data,
            type: 'line',
            stack: '',
            areaStyle: {color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#6dd5ed' // color at 0% position
                }, {
                  offset: 1, color: 'white' // color at 100% position
                }],
                global: false // false by default
              }},
            smooth: false,
            lineStyle: {color: 'rgb(121,173,244)', width: 2}
          }
        ],
      };
      this.isLoading = false;
    })
  }

  getGlobalValues() {
    this.apiService.getAllCases({country: 'Global'}).subscribe((res: any) => {
      this.total = res.All;
    })
  }

  getAllCases() {
    this.apiService.getAllCases().subscribe((res: any) => {
      this.countryList = Object.keys(res);
    })
  }

  getVaccinationDetails() {
    const params: any ={
      country: this.country.value
    }
    this.apiService.getVaccinationDetails(params).subscribe((res: any) => {
      const data: any = [
        { value: res.All?.people_vaccinated, name: 'People Vaccinated'},
        {value: res.All?.people_partially_vaccinated, name: 'People Partially Vaccinated'},
        {value: res.All?.population, name: 'Population'},
      ]
      if (res.All) {
        this.barChart =  {
          title: {
          text: this.country.value,
            subtext: 'Vaccination',
            left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
            left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      }
    })
  }

  chartChange() {
    if(this.selectedNav === 'Deaths') {
      this.getCountryWiseList()
    } else{
      this.getVaccinationDetails();
    }
  }

  switchData(link: any) {
    this.selectedNav = link.name;
    if(this.selectedNav === 'Deaths') {
      this.getCountryWiseList()
    } else {
      this.getVaccinationDetails();
    }
  }
}
