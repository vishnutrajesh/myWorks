import { Component, OnInit } from '@angular/core';
import {OwlCarousel} from "ngx-owl-carousel";

class Images {
  id: number;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  img: Images[];
  customOptions = {
    loop: true,
    dots: false,
    nav: false,
    responsiveClass:true,
    responsive:{
      0:{
        items:1,
      },
      600:{
        items:2,
      },
      1000:{
        items:4,
        loop:false
      }
    }
  };

  options = {
    loop: true,
    dots: true,
    nav: false,
    responsiveClass:true,
    responsive:{
      0:{
        items:1,
      },
      600:{
        items:2,
      },
      1000:{
        items:3,
        loop:false
      }
    }
  };
  blog =[
    {id:0,url: 'assets/img/img13.jpg'},
    {id:1,url: 'assets/img/img14.jpg'},
    {id:2,url: 'assets/img/img15.jpg'},
    {id:4,url: 'assets/img/img13.jpg'},
    {id:5,url: 'assets/img/img14.jpg'},
    {id:6,url: 'assets/img/img15.jpg'}
  ];

  catogories = [
    {name: 'Developemnt', icon: 'fa fa-code'},
    {name: 'Software', icon: 'fa fa-desktop'},
    {name: 'Design', icon: 'fa fa-paint-brush'},
    {name: 'Business', icon: 'fa fa-briefcase'},
    {name: 'Lifestyle', icon: 'fa fa-leaf'},
    {name: 'Photography', icon: 'fa fa-camera'},
    {name: 'Joomla', icon: 'fa fa-joomla'},
    {name: 'Wordpress', icon: 'fa fa-wordpress'},
    {name: 'Language', icon: 'fa fa-language'},
    {name: 'Music', icon: 'fa fa-music'},
    {name: 'Photoshop', icon: 'fa fa-picture-o'},
    {name: 'Medicine', icon: 'fa fa-heartbeat'}
  ];

  constructor() {
    this.img = [
      {id:0,url: 'assets/img/google1.png'},
      {id:1,url: 'assets/img/envato.png'},
      {id:2,url: 'assets/img/google1.png'},
      {id:3,url: 'assets/img/envato.png'},
      {id:3,url: 'assets/img/google1.png'}
    ];
  }

  ngOnInit() {
    console.log(this.img);
  }

  right(slider: OwlCarousel) {
    slider.next();
  }

  left(slider: OwlCarousel) {
    slider.previous();
  }
}
