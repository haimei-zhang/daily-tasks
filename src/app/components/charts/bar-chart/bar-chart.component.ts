import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as echarts from 'echarts';
import EChartOption = echarts.EChartsOption;
import ECharts = echarts.ECharts;

@Component({
  selector: 'diary-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() options = {
    chartId: '',
    legend: {},
    xAxisData: [],
    seriesData: []
  };
  @Input() lastUpdatedTime: number;
  eCharts: ECharts;

  constructor(readonly translateService: TranslateService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initChart();
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options || changes.lastUpdatedTime) {
      this.drawChart();
    }
  }

  private initChart(): void {
    const chart: any = document.getElementById(this.options.chartId);
    this.eCharts = echarts.init(chart, 'light');
  }

  private drawChart(): void {
    if (this.eCharts) {
      const option: EChartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {title: this.translateService.instant('TABLE.SAVE')}
          }
        },
        legend: this.options.legend,
        grid: {
          left: '3%',
          right: 40,
          bottom: '3%',
          top: 40,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 45
          },
          data: this.options.xAxisData
        },
        yAxis: {type: 'value', name: this.translateService.instant('ANALYTICS.COUNT')},
        series: [{
          data: this.options.seriesData,
          type: 'bar',
          markPoint: {
            data: [
              {type: 'max', name: 'Max'},
              {type: 'min', name: 'Min'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: 'Average'}
            ]
          }
        }]
      };
      this.eCharts.setOption(option);
      this.eCharts.resize();
    }
  }
}
