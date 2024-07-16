import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{
  customers :Customer[] = []
  constructor(private dataService:DataService){}
  ngOnInit(): void {
    this.dataService.getCustomers().subscribe((data:Customer[])=>{
      this.customers = data;

    })
  }



}


