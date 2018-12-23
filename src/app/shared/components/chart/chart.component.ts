import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() config;
  @Input() data;
  chart;

  chartConfig = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Snapshot Chart'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: ''
      },
      min: 0
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          new Date(this.x)
      }
    },

    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
  }
  ngOnInit() {
    this.init();
  }
  init() {
    let chart = new Chart({
      chart: {
        type: 'spline',
        zoomType: 'x'
      },
      title: {
        text: 'Snapshot Chart'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: '.'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} '
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },
      series: [{   //
        name: "TEST",
        data: [
          [Date.UTC(1970, 10, 25), 0],
        ]
      }, {
        name: "TEST",
        data: [
          [Date.UTC(1970, 10, 25), 0],
        ]
      }, {
        name: "TEST",
        data: [
          [Date.UTC(1970, 10, 25), 0],
        ]
      }, {
        name: "TEST",
        data: [
          [Date.UTC(1970, 10, 25), 0],
        ]
      }]
    });
    this.chart = chart;
    this.chart.ref$.subscribe((data) => {
      console.log(data)
    });
  }


  ngOnChanges(changes) {
    if (changes['data'] && changes['data'].currentValue) {
      const chartObj: any = this.chartConfig;
      chartObj.series = changes['data'].currentValue;
      if (this.chart && this.chart.ref$) {
        this.chart.ref$.subscribe(ref => {
          ref.update(chartObj, true);
        });
      }
    }
  }
}
