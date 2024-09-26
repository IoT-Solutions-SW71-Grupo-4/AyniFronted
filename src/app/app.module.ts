import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from "@angular/material/sidenav";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
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
import {HeaderComponent} from "./shared/components/header/header.component";
import {WeatherComponent} from "./analyze/components/weather/weather.component";
import {AnalyzeSummaryComponent} from "./analyze/page/analyze-summary/analyze-summary.component";
import {MatLabel} from "@angular/material/form-field";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EditDeviceComponent } from './devices/components/edit-device/edit-device.component'; // Importa el componente
import { AddSensorComponent } from './devices/components/add-sensor/add-sensor.component';
import { IrrigationService } from './irrigation/services/irrigation.service';
import { SoilAnalysisComponent } from './shared/pages/soil-analysis/soil-analysis.component';
import { TopBarComponent } from './shared/topbar-nav/topbar-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './shared/pages/auth/login/login.component';
import { RegisterComponent } from './shared/pages/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    CropComponent,
    DashboardComponent,
    DevicesComponent,
    IrrigationComponent,
    CardCropComponent,
    CicularGraphComponent,
    EditDeviceComponent,
    AddSensorComponent,
    SoilAnalysisComponent,
    TopBarComponent,
    LoginComponent,
    WeatherComponent,
    AnalyzeSummaryComponent,
    HeaderComponent
  ],
    imports: [  NgxChartsModule,
      BrowserModule,
      AppRoutingModule,
      MatSidenavModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatListModule,
      MatIconModule,
      MatCardModule,
      FormsModule,
      ReactiveFormsModule,
      NgxChartsModule,
      BrowserModule,
      AppRoutingModule,
      MatSidenavModule,
      BrowserAnimationsModule,
      MatListModule,
      MatIconModule,
      MatCardModule,
      HttpClientModule,
      MatLabel
      
    ],
  providers: [
    provideAnimationsAsync(),
    IrrigationService
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
