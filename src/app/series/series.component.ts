import { Component, OnInit } from '@angular/core';
import { SerieService } from './serie.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  Series: any = [];
  apiResponse: any;
  searchQuery = '';
  timer: any = null;
  noResult = false;

  constructor(
    public serieService: SerieService
  ) {
    this.apiResponse = [];
   }

   ngOnInit() {
    this.AllSeries(1);
  }

//GetSeries
  AllSeries(page:number){
    this.serieService.getAllSeries(page).subscribe((data: {}) => {
      this.apiResponse = data;
      this.Series = data;
    });
  }

//ChangePage Function
  changePage(event:any){
    this.AllSeries(event.pageIndex + 1);
  }

//SearchSeries
  searchSerie(searchStr: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      searchStr = searchStr.trim();
      if (searchStr === '') {
        this.Series = this.apiResponse;
        return;
      }
      this.serieService.searchSerie(searchStr).subscribe((data: {
        total_results: number;
      }) => {
        this.noResult = false;
        if (data.total_results === 0) {
          this.Series = [];
          this.noResult = true;
          return;
        }
        this.Series = data;
      });
    }, 250);
  }
}