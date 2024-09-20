import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from "@angular/material/sidenav";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './shared/pages/side-nav/side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { CropComponent } from './crop/components/crop/crop.component';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';
import { DevicesComponent } from './shared/pages/devices/devices.component';
import { IrrigationComponent } from './shared/pages/irrigation/irrigation.component';
import { CardCropComponent } from './crop/components/card-crop/card-crop.component';
import {MatCardModule} from "@angular/material/card";
import { CicularGraphComponent } from './report/components/cicular-graph/cicular-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    CropComponent,
    DashboardComponent,
    DevicesComponent,
    IrrigationComponent,
    CardCropComponent,
    CicularGraphComponent
  ],
    imports: [
        NgxChartsModule,
        BrowserModule,
        AppRoutingModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
