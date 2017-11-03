import { Component, OnInit,AfterViewInit,  ViewChild, SimpleChanges } from '@angular/core';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  itemsRef: AngularFireList<any>;
  jsondata:JSON;
  preparedSpeech: Observable<any[]>;
  i:number=120;
 labels:string[] = [];
     data:number[] = [];
  public isDataAvailable:boolean = false;

    @ViewChild(BaseChartDirective)
    public _chart: BaseChartDirective;

  constructor(public afDb: AngularFireDatabase) { 
    
  }

returnList(data: any){
  console.log("Inside Data"+data)
       data.map(c => (
         console.log(this.doughnutChartLabels),
        this.doughnutChartLabels.push( c.payload.key),
        this.doughnutChartData.push( Number(c.payload.val()))
        ));
    
}
  public doughnutChartLabels:string[]=[] ;
  public doughnutChartData:number[] =[];
  public doughnutChartType:string = 'doughnut';

  ngOnInit() {
    console.log("herer");
    this.itemsRef = this.afDb.list('Votes-PreparedSpeech');
    console.log(this.itemsRef);
    this.itemsRef.snapshotChanges().subscribe((changes)=>{
      changes.forEach(snapshot=>{
        console.log("Inside Iteration");
        this.doughnutChartLabels.push(String(snapshot.key));
        this.doughnutChartData.push(Number(snapshot.payload.val().text));
      })
      this.reloadChart();
    });

    //this.doughnutChartLabels=labels;
    //this.doughnutChartData=data;
    this.isDataAvailable = true;
    console.log(this.doughnutChartLabels);
    console.log(this.doughnutChartData);
    console.log(this._chart);
    //this.reloadChart()
  }

reloadChart() {
  console.log("sadasdasd"+this._chart);
    if (this._chart !== undefined) {
       //this._chart.chart.destroy();
       //this._chart.chart = 0;
       console.log("afterasyn"+this.doughnutChartData.length);
       console.log(this.doughnutChartLabels.length);
       //this._chart.datasets = this.doughnutChartData;
       //this._chart.labels = this.doughnutChartLabels;
       this._chart.ngOnInit();
    }
}


  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
