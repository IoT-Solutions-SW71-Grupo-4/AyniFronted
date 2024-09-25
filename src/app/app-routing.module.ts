import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./shared/pages/dashboard/dashboard.component";
import {DevicesComponent} from "./shared/pages/devices/devices.component";
import {IrrigationComponent} from "./shared/pages/irrigation/irrigation.component";
import { EditDeviceComponent } from './devices/components/edit-device/edit-device.component'; // Ajusta la ruta según tu estructura
import { AddSensorComponent } from './devices/components/add-sensor/add-sensor.component'; // Asegúrate de importar el componente
import { SoilAnalysisComponent } from './shared/pages/soil-analysis/soil-analysis.component';
import { LoginComponent } from './shared/pages/auth/login/login.component';
import { SideNavComponent } from './shared/pages/side-nav/side-nav.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent }, // Ruta de login sin layout
  { 
    path: '', 
    
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'devices/edit/:id', component: EditDeviceComponent },
      { path: 'devices/add', component: AddSensorComponent },
      { path: 'soil-analysis', component: SoilAnalysisComponent },
      { path: 'irrigation', component: IrrigationComponent },
      { path: '**', redirectTo: 'dashboard' } // Redirección para rutas no encontradas
    ] 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
