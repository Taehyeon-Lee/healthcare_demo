import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { User } from '../../service/user.model';

/**
 * Glucose Graph Component
 */
@Component({
  selector: 'glucose-line-graph',
  template: `
    <div style="display: block" *ngIf="lineChartLabels.length > 0">
      <canvas baseChart
        [datasets]="lineChartData"
        [labels]="lineChartLabels"
        [options]="lineChartOptions"
        [legend]="lineChartLegend"
        [type]="'line'"
        >
      </canvas>
    </div>
  `
})
export class GlucoseGraphComponent implements OnInit {
  curUser: User | null;

  public lineChartData: any[] = [
    { data: [], label: 'glucose level' },
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend = true;

  constructor(private authService: AuthService,
              private http:HttpClient) {
    this.curUser = this.authService.userValue;
  }

  /**
   * On init, the chart data is updated with the data from the database
   */
  ngOnInit() {
    // You can fetch your data and update the chart data here
    const url = 'http://localhost:3000/healthStats/' + this.curUser?.uid;
    try{
      this.http.get(url).subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            const dateObj = new Date(element.date);
            const formattedDate = dateObj.toISOString().split('T')[0];

            this.lineChartData[0].data.push(element.blood_glucose);
            this.lineChartLabels.push(formattedDate);
          });
        }, error: (error: any) => {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }

  }
}
