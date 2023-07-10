import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardUsersComponent } from './dashboard-users/dashboard-users.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersOesComponent } from './users-oes/users-oes.component';
import { UsersSearchComponent } from './users-search/users-search.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardUsersComponent,
    MessagesComponent,
    UsersDetailsComponent,
    UsersOesComponent,
    UsersSearchComponent,
    AddNewUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
