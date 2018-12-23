import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwErrorIfAlreadyLoaded } from './module-import-guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: [
        HttpClientModule
    ],
    providers: [

    ]
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwErrorIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}