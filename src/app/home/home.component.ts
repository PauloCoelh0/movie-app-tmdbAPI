import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movies/movie.service';
import { SerieService } from '../series/serie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hgroup:any;
  nowPlaying: any;
  onAir: any;

  constructor(
    private movies: MovieService,
    private series: SerieService
  ) { }

  ngOnInit(){
    this.nowPlayingMovies();
    this.onAirTvShows();
  }


  nowPlayingMovies(){
    this.movies.getNowPlayingMovies().subscribe((res:any) =>{
      this.nowPlaying = res.results;
    })
  }

onAirTvShows(){
  this.series.getOnAirTvShows().subscribe((res:any) =>{
    this.onAir = res.results;
  })
}

}
