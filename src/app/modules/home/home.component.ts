import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/core/services/app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chartConfig = {};
  chartData = {};

  today = new Date();
  min = +new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1);
  max = +new Date();
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  dateRangeSelected(range) {
    this.min = +range.fromDate;
    this.max = +range.toDate;
  }

  getData() {
    this.appService.getSnapshotsData(this.min, this.max).subscribe((data: any) => {
      this.sordata(data);
      this.chartData = this.getFormattedChartData(data);
    })
  }

  compare(a, b) {
    if (a.timestamp < b.timestamp)
      return -1;
    if (a.timestamp > b.timestamp)
      return 1;
    return 0;
  }


  sordata(data) {
    for (let i = 0; i < data.length; i++) {
      data[i].snapshots = data[i].snapshots.sort(this.compare)
    }
  }



  getFormattedChartData(data) {
    const formattedData = []

    for (let i = 0; i < data.length; i++) {
      const serieObj: any = {
        lineWidth: 0,
        marker: {
          enabled: true,
          radius: 2
        },
      }
      serieObj.name = data[i].frequency;
      serieObj.data = [];

      for (let j = 0; j < data[i].snapshots.length; j++) {
        const dataObj = {
          x: 0,
          y: 0,
          marker: {
            symbol: ''
          }
        }
        dataObj.x = data[i].snapshots[j].timestamp;
        if (data[i].frequency == 'daily') {
          dataObj.y = 1
          dataObj.marker.symbol = 'url(https://i.ibb.co/BNcrvkn/daily.png)'
        } else if (data[i].frequency == 'hourly') {
          dataObj.y = 2
          dataObj.marker.symbol = 'url(https://i.ibb.co/QD0WPz0/hourly.png)'
        } else if (data[i].frequency == 'minutely') {
          dataObj.y = 3
          dataObj.marker.symbol = 'url(https://i.ibb.co/19RtL4W/minutely.png)'
        } else if (data[i].frequency == 'manual') {
          dataObj.y = 4
          dataObj.marker.symbol = 'url(https://i.ibb.co/DQM5gGy/manual.png)'
        }
        if (data[i].snapshots[j].status == 'failed') {
          dataObj.marker.symbol = 'url(https://i.ibb.co/J37dtCH/failed.png)'
        }
        serieObj.data.push(dataObj);
      }
      formattedData.push(serieObj);
    }
    return formattedData;
  }

  getChartConfiguration() {

  }
}
