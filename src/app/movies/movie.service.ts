import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_TMDB } from '../API_TMDB';
import { Movies } from './movies';
import { Details } from '../General Details(Movies/details';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { retry } from 'rxjs/operators';
import { Trailer } from '../trailer/trailer';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiURL = API_TMDB.apiUrl;
  language:string;

  constructor(private http: HttpClient) {
    this.language = 'en-US';
  }

  
  // PopularMovies
  getAllMovies(page: number): Observable<Movies> {
    return this.http.get<Movies>(`${this.apiURL}movie/popular?api_key=${API_TMDB.apiKey}&page=${page}&language=${this.language}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // MovieDetails
  getMovieDetails(id: number): Observable<Details> {
    return this.http.get<Details>(`${this.apiURL}movie/${id}?api_key=${API_TMDB.apiKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // MovieCredits
  getMovieCredits(id: number): Observable<Details> {
    return this.http.get<Details>(`${this.apiURL}movie/${id}/credits?api_key=${API_TMDB.apiKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // MovieSearch
  searchMovie(query: string): Observable<Movies> {
    return this.http.get<Movies>(API_TMDB.search1 + query)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //NowPlayingMovies
  getNowPlayingMovies(): Observable<Movies> {
    return this.http.get<Movies>(`${this.apiURL}movie/now_playing?api_key=${API_TMDB.apiKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // TrailerById
  getMovieTrailer(id: number): Observable<Trailer> {
    return this.http.get<Trailer>(`${this.apiURL}movie/${id}/videos?api_key=${API_TMDB.apiKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // ErrorHandling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
