import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexAnnotations,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexFill,
  ApexTooltip,
  ApexMarkers,
  ApexPlotOptions,
  ApexLegend,
  ApexResponsive
} from 'ng-apexcharts';

interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  title: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  annotations?: ApexAnnotations;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  markers?: ApexMarkers;
  plotOptions?: ApexPlotOptions;
  legend?: ApexLegend;
  responsive?: ApexResponsive[];
  labels?: string[];
}

interface Statistics {
  period: string;
  count?: number;
  biggest_amount?: number;
  most_active_user?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class AppDashboardComponent implements OnInit {
  public loginStats: Statistics[] = [];
  public transactionStats: Statistics[] = [];
  public creditSimulationStats: Statistics[] = [];

  public loginChartOptions: Partial<ChartOptions> | any;
  public transactionChartOptions: Partial<ChartOptions> | any;
  public creditSimulationChartOptions: Partial<ChartOptions> | any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.http.get<Statistics[]>('http://localhost:8000/statistics/logins').subscribe({
      next: (data: Statistics[]) => {
        if (Array.isArray(data)) {
          this.loginStats = data;
          this.createLoginChart();
        } else {
          console.error('Unexpected data format for login statistics');
        }
      },
      error: (error) => {
        console.error("Failed to fetch login statistics", error);
      }
    });

    this.http.get<Statistics[]>('http://localhost:8000/statistics/transactions').subscribe({
      next: (data: Statistics[]) => {
        if (Array.isArray(data)) {
          this.transactionStats = data;
          this.createTransactionChart();
        } else {
          console.error('Unexpected data format for transaction statistics');
        }
      },
      error: (error) => {
        console.error("Failed to fetch transaction statistics", error);
      }
    });

    this.http.get<Statistics[]>('http://localhost:8000/statistics/credit-simulations').subscribe({
      next: (data: Statistics[]) => {
        if (Array.isArray(data)) {
          this.creditSimulationStats = data;
          this.createCreditSimulationChart();
        } else {
          console.error('Unexpected data format for credit simulation statistics');
        }
      },
      error: (error) => {
        console.error("Failed to fetch credit simulation statistics", error);
      }
    });
  }

  createLoginChart() {
    this.loginChartOptions = {
      series: [
        {
          name: "Logins",
          data: this.loginStats.map(stat => stat.count || 0)
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Login Statistics",
        align: "left"
      },
      xaxis: {
        categories: this.loginStats.map(stat => stat.period),
        title: {
          text: "Period"
        }
      },
      yaxis: {
        title: {
          text: "Number of Logins"
        }
      }
    };
  }

  createTransactionChart() {
    this.transactionChartOptions = {
      series: [
        {
          name: "Transactions",
          data: this.transactionStats.map(stat => stat.count || 0)
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: number) {
          return val.toFixed(0);
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: this.transactionStats.map(stat => stat.period),
        position: "bottom",
        title: {
          text: "Period"
        }
      },
      yaxis: {
        title: {
          text: "Number of Transactions"
        }
      },
      title: {
        text: "Transaction Statistics",
        align: "center"
      },
      annotations: {
        yaxis: [
          {
            y: Math.max(...this.transactionStats.map(stat => stat.biggest_amount || 0)),
            borderColor: "#FF4560",
            label: {
              borderColor: "#FF4560",
              style: {
                color: "#fff",
                background: "#FF4560"
              },
              text: `Biggest Transaction: $${Math.max(...this.transactionStats.map(stat => stat.biggest_amount || 0))}`
            }
          }
        ]
      }
    };
  }

  createCreditSimulationChart() {
    this.creditSimulationChartOptions = {
      series: this.creditSimulationStats.map(stat => stat.count || 0),
      chart: {
        width: 380,
        type: "donut"
      },
      labels: this.creditSimulationStats.map(stat => stat.period),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      title: {
        text: "Credit Simulation Statistics",
        align: "center"
      }
    };
  }
}
