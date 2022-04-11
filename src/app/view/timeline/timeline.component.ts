import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'diary-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  avatarSrc = 'assets/images/timeline.jpg';

  constructor() { }

  ngOnInit(): void {
    this.getTimeline();
  }

  refresh(e): void {

  }

  getTimeline(): void {
   /* const timelineSwiper = new Swiper ('.timeline .swiper-container', {
      direction: 'vertical',
      loop: false,
      speed: 1600,
      pagination: '.swiper-pagination',
      paginationBulletRender: function (swiper, index, className) {
        var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
        return '<span class="' + className + '">' + year + '</span>';
      },
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      breakpoints: {
        768: {
          direction: 'horizontal',
        }
      }
    });*/
  }

}
