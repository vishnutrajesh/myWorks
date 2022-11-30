import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postData: any;
  @Input() set posts(data: any) {
    if(data) {
      this.postData = data;
      console.log(this.postData);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  showMore(title: HTMLParagraphElement, button: HTMLSpanElement) {
    title.style.display = 'block';
    button.style.display = 'none';
  }
}
