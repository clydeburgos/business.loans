import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { SharedLibrary } from 'src/app/libraries/shared-library';
import { Loan } from 'src/app/models/loan.model';
import { CustomerService } from 'src/app/services/customer.service';

import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loan-form',
    templateUrl: './loan-form.component.html',
    styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {
  loanNumber: string = '';
  customers: any = [];
  busy: boolean = false;

  model: Loan; 
  
  public searchKey: FormControl = new FormControl();
  constructor(private customerService: CustomerService) { 
      this.model = new Loan();
  }

  ngOnInit() {
    this.searchKey.valueChanges.pipe(debounceTime(200)).subscribe(val => {
      this.busy = true;
      this.customerService.searchCustomer(val).subscribe((response: any[]) => {
        this.customers = response;
        this.busy = false;
      });
    });

    this.loadDefaults();
  }

  loadDefaults(){
    const sharedLib = new SharedLibrary();
    this.loanNumber = sharedLib.generateTransactionNumber();

    this.model.LoanNumber = this.loanNumber;
    this.model.TransactionDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.model.EstimatedDueDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    console.log(this.model.TransactionDate, this.model.EstimatedDueDate)
  }

  toggleBreakdown() {

  }
}
