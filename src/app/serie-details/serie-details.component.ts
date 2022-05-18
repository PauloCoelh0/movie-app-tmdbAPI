import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerieService } from '../series/serie.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TrailerComponent } from '../trailer/trailer.component';
@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrls: ['./serie-details.component.scss']
})
export class SerieDetailsComponent implements OnInit {

  serieId:any;
  tv: any;
  credits: any = [];
  series:any = [];
  apiResponse: any;
  innerWidth: any;
  SerieDetails: any = [];

  constructor(
    public route: ActivatedRoute,
    public serieService: SerieService,
    public dialog: MatDialog
  ) { }

  ngOnInit(){

    this.initSerieDetails();

    
  }

//GetFunctions
getSerieDetails(){
  this.serieService.getSeriesDetails(this.tv)
  .subscribe((data:{}) => this.SerieDetails = data);
}

getSeriesCredits(){
  this.serieService.getSeriesCredits(this.tv)
  .subscribe((response:any) => this.credits = response.credits);
}
  
fourCast() {
  return this.credits.cast.slice(0,4);
}

selectTV(tv:any){
  this.tv = tv;
  this.getSerieDetails();
}

//Init
initSerieDetails(){
  const id = this.route.snapshot.paramMap.get('tv');
  if(id != null){
    this.tv = id;
  }
  this.serieService.getSeriesDetails(this.tv)
  .subscribe(response => this.serieId = response);
  this.serieService.getSeriesCredits(this.tv)
  .subscribe(response => this.credits = response);
  this.innerWidth = window.innerWidth;
    return this.serieService.getSeriesDetails(this.tv).subscribe((data: {}) => {
      this.SerieDetails = data;
    });
}

//Trailer
openDialog(): void {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;

  const relativeWidth = this.innerWidth > 1500 ? (1500 * 80) / 100 : (this.innerWidth * 80) / 100; 
  const relativeHeight = (relativeWidth * 9) / 16; 
  dialogConfig.width = relativeWidth + 'px';
  dialogConfig.height = relativeHeight + 'px';
  this.serieService.getSerieTrailer(this.tv).subscribe((data: {
    results: any;
  }) => {
    dialogConfig.data = {
      url: data.results[0].key
    };
    this.dialog.open(TrailerComponent, dialogConfig);
  });

}
}
