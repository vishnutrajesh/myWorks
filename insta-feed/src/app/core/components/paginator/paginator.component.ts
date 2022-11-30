import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  linkSizeArray: number[] = [];
  @Input() totalRecords: number = 0;
  currentPage: number = 1;
  @Input() set pageLinkSize(size: number) {
    size > 0 ? this.linkSizeArray = [...Array(size).keys(), size].slice(1, size + 1): this.linkSizeArray = [1,2,3,4,5]
  }
  @Output() pageChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  changePage($event: MouseEvent, pageNo: number) {
    $event.preventDefault();
    if(this.currentPage !== pageNo) {
      if(pageNo === this.linkSizeArray[this.linkSizeArray.length - 1]) {
        this.linkSizeArray = this.linkSizeArray.map((page: number) => page + 2);
      } else if(pageNo === this.linkSizeArray[0] && this.linkSizeArray[0]> 1) {
        this.linkSizeArray = this.linkSizeArray.map((page: number) => page - 2);
      }
      this.currentPage = pageNo;
      this.pageChange.emit({page: pageNo})
    }
  }
}
