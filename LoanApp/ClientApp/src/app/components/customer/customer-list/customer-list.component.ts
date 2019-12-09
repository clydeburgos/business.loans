import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  busy: boolean = false;
  customers: any[];
  customerColums: any[];

  private gridApi;
  private gridColumnApi;

  public searchKey: FormControl = new FormControl();

  constructor(private customerService: CustomerService) { 
    this.customerColums = [
      { headerName: 'First Name', field: 'firstName', sortable: true, filter: true },
      { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true },
      { headerName: 'Full Address', field: 'streetAddress', sortable: true, filter: true, cellRenderer: this.addressRenderer.bind(this) },
      { headerName: 'City', field: 'city', sortable: true, filter: true},
      { headerName: 'Contact Numbers', field: 'telephoneNumber', sortable: true, filter: true, cellRenderer: this.contactRenderer.bind(this) },
      { headerName: 'Member Status', field: 'isMember', sortable: true, filter: true, cellRenderer: this.membershipRenderer.bind(this) },
      { headerName: 'Actions', width: 100, cellRenderer: this.actionRenderer.bind(this) }
  ];
  }

  ngOnInit() {
    this.loadCustomers();
    this.searchKey.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.gridApi.setQuickFilter(value);
    });
  }

  loadCustomers(){
    this.busy = true;
    this.customerService.getCustomers().subscribe((response : any[]) => {
      if(response) this.customers = response;
      this.busy = false;
    })
  }

  addressRenderer(params){
    const self = this;
    const value = params.value;
    const data = params.data;
    const eDiv = document.createElement('div');

    let template = `${data.streetAddress}, ${data.city}, ${data.postalCode}`;
    eDiv.innerHTML = template;
    return eDiv;
  }

  contactRenderer(params){
    const self = this;
    const value = params.value;
    const data = params.data;
    const eDiv = document.createElement('div');

    let template = `${data.telephoneNumber} / ${data.mobileNumber}`;
    eDiv.innerHTML = template;
    return eDiv;
  }

  membershipRenderer(params){
    const self = this;
    const value = params.value;
    const eDiv = document.createElement('div');

    let template = `
      <div class="actions">
        ${ value ? '<span class="badge badge-success">MEMBER</span>' : '<span class="badge badge-secondary">NON-MEMBER</span>' }
      </div>
    `;
    eDiv.innerHTML = template;
    return eDiv;
  }

  editCustomer(params, self){

  }

  deleteCustomer(params, self){

  }

  private actionRenderer(params) {
    const self = this;
    const eDiv = document.createElement('div');

    const template = `
        <div class="actions">
          <a class="action-item edit-customer" href="javascript:void(0)"><i class="fas fa-pencil-alt"></i> &nbsp;</a>
          <a class="action-item delete-customer" href="javascript:void(0)"><i class="fas fa-minus-circle"></i> &nbsp;</a>
        </div>
    `;
    eDiv.innerHTML = template;

    const editBtn = eDiv.querySelectorAll('.edit-customer')[0];
    const deleteBtn = eDiv.querySelectorAll('.delete-customer')[0];

      editBtn.addEventListener('click', () => {
        self.editCustomer(params, self);
      });

      deleteBtn.addEventListener('click', () => {
        self.deleteCustomer(params, self);
      });

    return eDiv;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
}
