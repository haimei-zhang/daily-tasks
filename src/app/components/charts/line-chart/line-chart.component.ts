import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartsOption;

@Component({
  selector: 'diary-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit, OnChanges {

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
          boundaryGap: false,
          data: this.options.xAxisData
        },
        yAxis: {type: 'value'},
        series: this.options.seriesData
      };
      this.eCharts.setOption(option);
      this.eCharts.resize();
    }
  }
}
