import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpWrapperService: HttpWrapperService) { }

  getSnapshotsData(start, end) {
    const url = "https://fast-plains-79447.herokuapp.com/api/snapshots?start=" + start + "&end=" + end
    return this.httpWrapperService.fetchData({ url })
  }
}
