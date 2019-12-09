import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer/customer-form/customer-form.component';
import { CustomerService } from './services/customer.service';
import { AgGridModule } from 'ag-grid-angular';

import { PaymentListComponent } from './components/payment/payment-list/payment-list.component';
import { PaymentFormComponent } from './components/payment/payment-form/payment-form.component';
import { LoanFormComponent } from './components/loan/loan-form/loan-form.component';
import { LoanListComponent } from './components/loan/loan-list/loan-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CustomerListComponent,
    CustomerFormComponent,
    LoanFormComponent,
    LoanListComponent,
    PaymentListComponent,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'loans', component: LoanListComponent },
      { path: 'loans/create', component: LoanFormComponent },
      { path: 'customers', component: CustomerListComponent },
      { path: 'customers/create', component: CustomerFormComponent },
    ])
  ],
  providers: [ CustomerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
