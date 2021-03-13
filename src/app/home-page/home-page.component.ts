import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewChecked {
  beer_list: any;
  beer_data: any;
  random_beer_data: any;
  countbefore: number;
  countafter: number;
  page_number: number = 1;
  favourite_beers = [];
  display: any;
  constructor(private http: HttpClient) {
    this.beer_list = new Array();
    this.favourite_beers = new Array();
    if (localStorage.getItem('fav_list') != null) {
      this.favourite_beers = JSON.parse(localStorage.getItem('fav_list'));
    }
  }

  ngOnInit() {
    this.getBeers();
    this.scrollTopFunction();
    $(document).ready(function () {
      window.onscroll = function () { scrollFunction() };

      function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          $("#myBtn").css({'display':'block'});
        } else {
          $("#myBtn").css({'display':'none'});
        }
      }
    });

  }
  ngAfterViewChecked() {
    this.setFavouritesafterReload();
  }
  scrollTopFunction() {
    $(document).ready(function () {
      $(window).scrollTop(0);
    });
  }


  getBeers() {
    this.http.get("https://api.punkapi.com/v2/beers?page=" + this.page_number + "&per_page=80").subscribe((res: any) => {

      for (let i = 0; i < res.length - 1; i++) {
        this.beer_list.push(res[i]);

      }

      console.log(this.beer_list);

    })
  }
  setUnsetFavourite(e, id) {
    debugger
    if (localStorage.getItem('fav_list') == null) {
      this.favourite_beers.push(id);
      localStorage.setItem('fav_list', JSON.stringify(this.favourite_beers));
      $('#star_' + id).css({ "color": "#F89400" });
    } else {
      var loc_fav = JSON.parse(localStorage.getItem('fav_list'));
      for (let i = 0; i < loc_fav.length; i++) {
        if (loc_fav[i] == id) {
          this.favourite_beers.splice(i, 1);
          localStorage.setItem('fav_list', JSON.stringify(this.favourite_beers));
          $('#star_' + id).css({ "color": "white" });
          id = 0;
          break;
        }
      } if (id != 0) {
        this.favourite_beers.push(id);
        localStorage.setItem('fav_list', JSON.stringify(this.favourite_beers));
        $('#star_' + id).css({ "color": "white" });
      }

    }
  }

  setFavouritesafterReload() {
    if (localStorage.getItem('fav_list') != null) {
      var loc_fav = JSON.parse(localStorage.getItem('fav_list'));
      var flength = loc_fav.length;
      for (let i = 0; i < flength; i++) {
        var ids = loc_fav[i];
        $('#star_' + ids).css({ "color": "#F89400" });
      }
    }
    else {
      $('#star_' + localStorage.getItem('fav_list')).css({ "color": "#F89400" });
    }
  }
  getDetailsById(id) {

    this.http.get("https://api.punkapi.com/v2/beers/" + id).subscribe(res => {
      this.beer_data = res;
      console.log(res);

    })
  }
  searchBeers(e) { debugger

    this.http.get("https://api.punkapi.com/v2/beers?beer_name=" + e.target.value).subscribe(res => {
      this.beer_list=res
    })
  }

  onScroll() {
    this.page_number += 1;

    this.http.get("https://api.punkapi.com/v2/beers?page=" + this.page_number + "&per_page=80").subscribe((res: any) => {
      if (res != []) {
        for (let i = 0; i < res.length - 1; i++) {
          this.beer_list.push(res[i]);
        }
        console.log(this.beer_list);
        console.log(this.page_number);
      }
    })
  }
}
