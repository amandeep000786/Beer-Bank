import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule} from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FavouriteComponent } from './favourite/favourite.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    FavouriteComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
