import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { User } from '../../service/user.model';

@Component({
  selector: 'blood-pressure-graph',
  template: `
    <div style="display: block" *ngIf="barChartLabels.length > 0">
      <canvas baseChart
        [datasets]="barChartData"
        [labels]="barChartLabels"
        [options]="barChartOptions"
        [legend]="barChartLegend"
        [type]="'bar'"
        >
      </canvas>
    </div>
  `
})
export class BPressureGraphComponent implements OnInit {
  curUser: User | null;

  public barChartData: any[] = [
    { data: [], label: 'Blood Pressure Level High' },
    { data: [], label: 'Blood Pressure Level Low' }
  ];
  public barChartLabels: string[] = [];
  public barChartOptions: any = {
    responsive: true,
    scales: {
      x: { collapse: true }, // Enable stacking on the x-axis
      y: { collapse: true }  // Enable stacking on the y-axis
    }
  };
  public barChartLegend = true;

  constructor(private authService: AuthService,
              private http:HttpClient) {
    this.curUser = this.authService.userValue;
  }



  ngOnInit() {
    // You can fetch your data and update the chart data here
    const url = 'http://localhost:3000/healthStats/' + this.curUser?.uid;
    try{
      this.http.get(url).subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            const dateObj = new Date(element.date);
            const formattedDate = dateObj.toISOString().split('T')[0];

            this.barChartData[0].data.push(element.blood_pressure_high);
            this.barChartData[1].data.push(element.blood_pressure_low);
            this.barChartLabels.push(formattedDate);
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
