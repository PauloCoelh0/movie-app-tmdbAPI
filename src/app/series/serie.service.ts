import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_TMDB } from '../API_TMDB';
import { Series } from './series';
import { Details } from '../General Details(Movies/details';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { retry } from 'rxjs/operators';
import { Trailer } from '../trailer/trailer';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  apiURL = API_TMDB.apiUrl;
  language:string;
  constructor(private http: HttpClient) {
    this.language = 'en-US';
   }

   //PopularSeries  
   getAllSeries(page:number): Observable<Series> {
    return this.http.get<Series>(`${this.apiURL}tv/popular?api_key=${API_TMDB.apiKey}&page=${page}&language=${this.language}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // SerieDetails
  getSeriesDetails(id: number): Observable<Details> {
    return this.http.get<Details>(`${this.apiURL}tv/${id}?api_key=${API_TMDB.apiKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
// SerieCredits
getSeriesCredits(id: number): Observable<Details> {
  return this.http.get<Details>(`${this.apiURL}tv/${id}/credits?api_key=${API_TMDB.apiKey}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
}

  // SerieSearch
  searchSerie(query: string): Observable<Series> {
    return this.http.get<Series>(API_TMDB.search2 + query)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //OnAirTvShows
  getOnAirTvShows(): Observable<Series> {
    return this.http.get<Series>(`${this.apiURL}tv/on_the_air?api_key=${API_TMDB.apiKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // TrailerById
  getSerieTrailer(id: number): Observable<Trailer> {
    return this.http.get<Trailer>(`${this.apiURL}tv/${id}/videos?api_key=${API_TMDB.apiKey}`)
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
