import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  beer_data: any;
  beer_list: any;
  shownofav:boolean;
  favourite_beers: any;
  constructor(private http: HttpClient) {
    this.favourite_beers = new Array();
    if (localStorage.getItem('fav_list') != null) {
      this.favourite_beers = JSON.parse(localStorage.getItem('fav_list'));
    }
  }

  ngOnInit() {
    this.getfavsbeer();
  }

  ngAfterViewChecked() {
    this.setFavouritesafterReload();
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

  setUnsetFavourite(e, id) {
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
          this.getfavsbeer();
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
  getfavsbeer() {
    var super_fin_ids;
    if (localStorage.getItem('fav_list').length != null) {
      var fin_ids = "";
      var loc_fav = JSON.parse(localStorage.getItem('fav_list'));
      var flength = loc_fav.length;
      for (let i = 0; i < flength; i++) {
        var _ids = loc_fav[i];
        var ids = _ids;
        if (fin_ids == "") {
          fin_ids += ids;

        }
        else {
          fin_ids += "|" + ids;
        }
      }
      super_fin_ids = fin_ids;
    }
    else {
      super_fin_ids = localStorage.getItem('fav_list');
    }
    this.http.get("https://api.punkapi.com/v2/beers?ids=" + super_fin_ids).subscribe(res => {
     
      this.beer_list = res;
    })
  }
  getDetailsById(id) {

    this.http.get("https://api.punkapi.com/v2/beers/" + id).subscribe(res => {
      this.beer_data = res;
      console.log(res);

    })
  }
}
