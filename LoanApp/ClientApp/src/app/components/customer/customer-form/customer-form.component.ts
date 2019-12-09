import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  model: Customer;
  isMember: boolean = true;

  
  constructor(private customerService: CustomerService, private router: Router) { 
    this.model = new Customer();
  }

  ngOnInit() {

  }

  save(){
    this.customerService.saveCustomer(this.model).subscribe((response) => {
      if(response) {
        this.router.navigateByUrl('/customer');
      }
    })
  }

  toggleMembership(e: any){
    this.isMember = e.target.checked;
  }

}
