import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AssetsComponent } from './pages/assets/assets.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SparepartsComponent } from './pages/spareparts/spareparts.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'assets', component: AssetsComponent, canActivate: [AuthGuard] },
  {
    path: 'spareparts',
    component: SparepartsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configurations',
    component: ConfigurationsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
