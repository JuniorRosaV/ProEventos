import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../util/constants';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'HoursFormatPipe'
})
export class HoursFormatPipe extends DatePipe implements PipeTransform {

  override transform(value: any): any {
      return super.transform(value, Constants.HOURS_FORMAT);
    }

}
