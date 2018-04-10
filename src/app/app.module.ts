import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from './services/validation.service';
import { AuthenticationService } from './services/authentication.service';
import { GlobalService } from './services/global.service';
import { ModalModule, AccordionModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CookieModule } from 'ngx-cookie';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 2000 }),
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ValidationService,AuthenticationService,GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
