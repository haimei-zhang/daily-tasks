import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartsOption;

@Component({
  selector: 'diary-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() options = {
    chartId: '',
    legendData: [],
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
      const option = {
        tooltip : {
          trigger: 'item',
          formatter: '{b} <br/>{a} : {c} ({d}%)'
        },
        toolbox: {
          left: 0,
          feature: {
            saveAsImage: {title: this.translateService.instant('TABLE.SAVE')}
          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: this.options.legendData,
        },
        series : [
          {
            name: this.translateService.instant('ANALYTICS.COUNT'),
            type: 'pie',
            radius : '55%',
            center: ['30%', '50%'],
            data: this.options.seriesData,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.eCharts.setOption(option);
      this.eCharts.resize();
    }
  }

}
