import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { SparepartsComponent } from './pages/spareparts/spareparts.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MiniTableDisplayComponent } from './components/mini-table-display/mini-table-display.component';
import { HttpClientModule } from '@angular/common/http';
import { TableDisplayComponent } from './components/table-display/table-display.component';
import { HistoryComponent } from './pages/history/history.component';
import { DetailItemComponent } from './components/detail-item/detail-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AssetsComponent,
    SparepartsComponent,
    ConfigurationsComponent,
    SidenavComponent,
    MiniTableDisplayComponent,
    TableDisplayComponent,
    HistoryComponent,
    DetailItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
