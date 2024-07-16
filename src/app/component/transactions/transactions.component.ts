import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Customer } from 'src/app/interface/customer';
import { DataService } from 'src/app/service/data.service';

Chart.register(...registerables);
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  transactions: any[] = [];
  transactionChart: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
        this.filteredCustomers = data; // Initially, show all customers
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  filterCustomers(event: any): void {
    const filterValue = event.target.value;
    if (filterValue) {
      this.filteredCustomers = this.customers.filter(customer => customer.name === filterValue);
    } else {
      this.filteredCustomers = this.customers;
    }
  }

  selectCustomer(customer: Customer): void {
    this.dataService.getTransactionsByCustomerId(customer.id).subscribe(
      (data: any[]) => {
        this.transactions = data;
        this.updateChart();
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  updateChart(): void {
    const labelData = this.transactions.map(t => t.date);
    const amountData = this.transactions.map(t => t.amount);

    if (this.transactionChart) {
      this.transactionChart.destroy();
    }

    this.transactionChart = new Chart('transactionChart', {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [{
          label: 'Transaction Amount',
          data: amountData,
          backgroundColor: '#9290C3',
          borderColor: '#535C91',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


}
