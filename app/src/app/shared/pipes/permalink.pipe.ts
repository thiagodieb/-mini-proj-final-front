import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permalink'
})
export class PermalinkPipe implements PipeTransform {

  transform(value: any): string {
    return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase();
  }

}
