import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import { MovieService } from '../movies/movie.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { TrailerComponent } from '../trailer/trailer.component';
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieId:any;
  film: any;
  credits: any = [];
  movies:any = [];
  apiResponse: any;
  innerWidth: any;
  MovieDetails: any = [];

  constructor(
    public route: ActivatedRoute,
    public movieService: MovieService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(){

    this.initMovieDetails();

    
  }

//Get Functions
getMovieDetails(){
  this.movieService.getMovieDetails(this.film)
  .subscribe((data:{}) => this.MovieDetails = data);
}

getMovieCredits(){
  this.movieService.getMovieCredits(this.film)
    .subscribe((response: any) => this.credits = response.credits);
}
  
  fourCast() {
    return this.credits.cast.slice(0,4);
}

selectFilm(film:any){
  this.film = film;
  this.getMovieDetails();
}

//Init
initMovieDetails(){
  const id = this.route.snapshot.paramMap.get('film');
  if(id != null){
    this.film = id;
  }
  this.movieService.getMovieDetails(this.film)
  .subscribe(response => this.movieId = response);
  this.movieService.getMovieCredits(this.film)
  .subscribe(response => this.credits = response);
  this.innerWidth = window.innerWidth;
    return this.movieService.getMovieDetails(this.film).subscribe((data: {}) => {
      this.MovieDetails = data;
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
  this.movieService.getMovieTrailer(this.film).subscribe((data: {
    results: any;
  }) => {
    dialogConfig.data = {
      url: data.results[0].key
    };
    this.dialog.open(TrailerComponent, dialogConfig);
  });
}

}
