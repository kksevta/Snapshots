import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './components/chart/chart.component';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import { ChartModule } from 'angular-highcharts';

import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxMatDrpModule,
        ChartModule
    ],
    declarations: [ChartComponent, DatePickerComponent],
    exports: [
        CommonModule,
        FormsModule,
        ChartComponent,
        DatePickerComponent
    ]
})
export class SharedModule { }