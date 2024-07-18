import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { GiveHelpComponent } from './give-help/give-help.component';
import { TakeHelpComponent } from './take-help/take-help.component';
import { LevelDataComponent } from './level-data/level-data.component';
import { PmfComponent } from './pmf/pmf.component';
import { GetprofileComponent } from './getprofile/getprofile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to login page on root path
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'give-help', component: GiveHelpComponent,canActivate:[AuthGuard] }, // Route for GiveHelpComponent
  { path: 'take-help', component: TakeHelpComponent,canActivate:[AuthGuard] }, // Route for GiveHelpComponent
  { path: 'level-details/:level', component: LevelDataComponent,canActivate:[AuthGuard] },
   // Route for GiveHelpComponent
  { path: 'pmf', component: PmfComponent,canActivate:[AuthGuard] }, // Route for GiveHelpComponent
  { path: 'getProfile', component: GetprofileComponent,canActivate:[AuthGuard] }, // Route for GiveHelpComponent


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
