import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatrixComponent } from './matrix/matrix.component';
import { NavComponent } from './nav/nav.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // enables the application to communicate with the backend services

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; // this will allow the app to automatically attach authorization information to requests
import { AuthInterceptor } from './shared/authconfig.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
    NavComponent,
    CategoryComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
