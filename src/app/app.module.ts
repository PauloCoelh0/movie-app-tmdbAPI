//Browser
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Module Rote da App
import { AppRoutingModule } from './app-routing.module';

//HttpClient Module 
import { HttpClientModule } from '@angular/common/http'

//Principal Components (Movies / Series / maybe Trailers)
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SerieDetailsComponent } from './serie-details/serie-details.component';
import { TrailerComponent } from './trailer/trailer.component';
import { HomeComponent } from './home/home.component';

//Custom Pipes
import { DateFormat } from './custom_pipes/dateFormat.pipe';
import { FilterPipe } from './custom_pipes/filter.pipe';

//Material Modules (==== MAT TEST ====)
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

//Form Module
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    SeriesComponent,
    MovieDetailsComponent,
    SerieDetailsComponent,
    DateFormat,
    FilterPipe,
    TrailerComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule
  ],
  entryComponents:[
    TrailerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
