import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  
  Movies: any = [];
  apiResponse: any;
  searchQuery = '';
  timer: any = null;
  noResult = false;

  constructor(
    public movieService: MovieService
  ) {
    this.apiResponse = [];
  }

  ngOnInit() {

    this.AllMovies(1);
  }

//Get Movies
  AllMovies(page:number){
    this.movieService.getAllMovies(page).subscribe((data: {}) => {
      this.apiResponse = data;
      this.Movies = data;
    });
  }

//ChangePage Function
  changePage(event:any){
    this.AllMovies(event.pageIndex + 1);
  }


//SearchMovie
  searchMovie(searchStr: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      searchStr = searchStr.trim();
      if (searchStr === '') {
        this.Movies = this.apiResponse;
        return;
      }
      this.movieService.searchMovie(searchStr).subscribe((data: {
        total_results: number;
      }) => {
        this.noResult = false;
        if (data.total_results === 0) {
          this.Movies = [];
          this.noResult = true;
          return;
        }
        this.Movies = data;
      });
    }, 250);
  }
}

