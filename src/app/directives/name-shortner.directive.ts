import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appNameShortner]'
})
export class NameShortnerDirective {
  @HostBinding('innerText') innerText = ''
  @Input() set text(data: string) {
    if( data) {
      this.innerText = this.shortText(data);
    }
  }
  constructor() { }

  shortText(text: string) {
    let full_name = text.split(" ");
    return (full_name[0][0] + full_name[0][1]).toLocaleUpperCase();
  }

}
