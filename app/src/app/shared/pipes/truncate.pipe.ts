import { Pipe, PipeTransform } from '@angular/core';
import Util from '../utils/util';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, lenght: number): string {
    if(value !== undefined && !Util.empty(value)) {
      return value.substring(0, lenght) + "...";
    }

    return value;
  }

}
