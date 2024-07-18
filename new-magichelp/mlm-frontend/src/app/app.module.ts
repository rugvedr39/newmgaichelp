import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GiveHelpComponent } from './give-help/give-help.component';
import { TakeHelpComponent } from './take-help/take-help.component';
import { LevelDataComponent } from './level-data/level-data.component';
import { PmfComponent } from './pmf/pmf.component';
import { CommonModule } from '@angular/common';
import { GetprofileComponent } from './getprofile/getprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    GiveHelpComponent,
    TakeHelpComponent,
    LevelDataComponent,
    PmfComponent,
    GetprofileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
