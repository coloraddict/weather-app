import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(p_date, timezone): any {
    // console.log(p_date, timezone);
    // console.log(moment.tz.names());
    var unix_time = p_date;
    var milliseconds = new Date(unix_time * 1000);    
    var date = moment(milliseconds).tz(timezone).format('MMMM Do YYYY, h:mm:ss a');    
    return date;
  }

}
