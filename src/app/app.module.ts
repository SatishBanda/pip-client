import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from './services/validation.service';
import { GlobalService } from './services/global.service';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component'; 
import { TabsModule, ModalModule, AccordionModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CookieModule } from 'ngx-cookie';
import { HttpService } from './interceptors/http.service';
import { LoaderService } from './interceptors/loader.service';
import { PartialViews } from './_partial-views/partial-views.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    PartialViews,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 3000 }),
    CookieModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ValidationService,AuthenticationService,GlobalService,Title,HttpService,LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
