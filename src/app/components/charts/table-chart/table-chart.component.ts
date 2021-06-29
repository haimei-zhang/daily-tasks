import { Component, Input, OnInit } from '@angular/core';
import * as R from 'ramda';

@Component({
  selector: 'diary-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.scss']
})
export class TableChartComponent implements OnInit {

  @Input() data: any;
  sortingByColumn = 'category';
  sortDescending = false;
  constructor() { }

  ngOnInit() {
  }

  sortColumn(columnName: string) {
    if (this.sortingByColumn !== columnName) {
      this.sortingByColumn = columnName;
      this.data = R.sort(R.ascend(R.prop(columnName)))(this.data);
      this.sortDescending = true;
    } else if (!this.sortDescending && this.sortingByColumn === columnName) {
      this.data = R.sort(R.ascend(R.prop(columnName)))(this.data);
      this.sortDescending = true;
    } else if (this.sortDescending && this.sortingByColumn === columnName) {
      this.data = R.sort(R.descend(R.prop(columnName)))(this.data);
      this.sortDescending = false;
    }
  }

}
