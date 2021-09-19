```javascript

import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transactions-service';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d.src';



@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage{
  highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  constructor(private transaction: TransactionService) {
    this.transaction.getPaymentsByStatus().subscribe((response) => {
      this.chartOptions = {
        chart: {
          options3d: {
            enabled: true,
            alpha: 45,
          },
        },
        title: {
          text: 'Payments',
        },
        plotOptions:{
          pie: {
            innerSize: 100,
            depth: 45
        }
            // shared options for all pie series
        }, 
        
        series: [
          {
            
            type: 'pie',
           name:'Payment',
            data: [
              ['PENDING',response.content.filter((a) => a.status == 'PENDING').length],
              ['PAID',response.content.filter((a) => a.status == 'PAID').length,],
              ['ERROR',response.content.filter((a) => a.status == 'ERROR').length,],
              ['INSUFFICIENT FUNDS',response.content.filter((a) => a.status == 'INSUFFICIENT_FUNDS').length],
              ['PROCESSING',response.content.filter((a) => a.status == 'PROCESSING').length,],
              ['FAILED',response.content.filter((a) => a.status == 'FAILED').length, ],
              ['PAY LATER',response.content.filter((a) => a.status == 'PAY_LATER').length,]
            ],
          },
        ],
      };
    });
  }
}
