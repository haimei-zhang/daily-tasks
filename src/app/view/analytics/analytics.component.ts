import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as R from 'ramda';

@Component({
  selector: 'diary-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {

  avatarSrc = 'https://thispersondoesnotexist.com/image';
  barChartOptions: any;
  pieChartOptions: any;
  lineChartOptions1: any;
  lineChartOptions2: any;
  chartType = 'table';
  lastUpdatedTime: number;
  data: any = [
    {category: 'test1', count: 1},
    {category: 'test2', count: 2},
    {category: 'test3', count: 3},
    {category: 'test4', count: 4},
    {category: 'test5', count: 5},
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.initBarChart();
    this.initPieChart();
    this.initLineChart1();
    this.initLineChart2();
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  refresh(e?): void {
    this.lastUpdatedTime = new Date().getTime();
  }

  private initBarChart(): void {
    if (this.data) {
      this.barChartOptions = {
        chartId: 'bar-chart',
        legend: {show: false}
      };
      this.barChartOptions.xAxisData = R.map((e: any) => e.category)(this.data);
      this.barChartOptions.seriesData = R.map((e: any) => e.count)(this.data);
    }
  }

  private initPieChart(): void {
    if (this.data) {
      this.pieChartOptions = {
        chartId: 'pie-chart'
      };
      this.pieChartOptions.legendData = R.map((e: any) => `${e.category} (${e.count})`)(this.data);
      this.pieChartOptions.seriesData = R.map((e: any) => {
        return {name: `${e.category} (${e.count})`, value: e.count};
      })(this.data);
    }
  }

  private initLineChart1(): void {
    if (this.data) {
      this.lineChartOptions1 = {
        chartId: 'line-chart1',
        legend: {show: false}
      };
      this.lineChartOptions1.xAxisData = R.map((e: any) => e.category)(this.data);
      this.lineChartOptions1.seriesData = R.map((e: any) => {
        return {name: `${e.category}`, type: 'line', data: e.count};
      })(this.data);
    }
  }

  private initLineChart2(): void {
    if (this.data) {
      this.lineChartOptions2 = {
        chartId: 'line-chart2',
      };
      this.lineChartOptions2.xAxisData = R.map((e: any) => e.category)(this.data);
      this.lineChartOptions2.seriesData = R.map((e: any) => {
        return {name: `${e.category}`, type: 'line', data: e.count};
      })(this.data);
    }
  }

}
