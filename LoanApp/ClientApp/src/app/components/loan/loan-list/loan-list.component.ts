import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
    styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  private gridApi;
  
  public customers: any[];

  constructor() { }
  public searchKey: FormControl = new FormControl();
  
  ngOnInit() {
  }

}
