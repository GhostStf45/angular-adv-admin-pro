import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent {

  //data
  //title
  //labels

  @Input('title') title = 'Sin titulo';

  @Input('labels') doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data')  doughnutChartData: MultiDataSet = [
    [0,0,0],
  ];
  @Input('colors') colors:Color[]=[
    {
      backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    }
  ];

}
