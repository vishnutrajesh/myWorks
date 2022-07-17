import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlTransform',
  pure: true
})
export class ImageUrlPipe implements PipeTransform {
  /* Transform image url based on api documentation */
  transform(value: string, id: string) {
    return id ? `url("${value}/${id}/full/843,/0/default.jpg")`: ''
  }

}
