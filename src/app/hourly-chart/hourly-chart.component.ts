import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-hourly-chart',
  template: '<canvas id="hourlyChart" width="400" height="200"></canvas>',
  styles: []
})
export class HourlyChartComponent implements OnInit {
  @Input() hourlyForecastData: any[] | undefined;

  ngOnInit() {
    if (this.hourlyForecastData) {
      const ctx = document.getElementById('hourlyChart') as HTMLCanvasElement;
      const labels = this.hourlyForecastData.map(entry => entry.time);
      const temperatures = this.hourlyForecastData.map(entry => entry.temp);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatures,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: Math.max(...temperatures) + 5
            }
          }
        }
      });
    }
  }
}
