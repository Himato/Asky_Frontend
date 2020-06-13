import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activity'
})
export class ActivityPipe implements PipeTransform {

  transform(value: any): any {
    if (!!value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 10) {
        return 'Now';
      }

      const intervals = {
        y: 31536000, // year
        m: 2592000, // month
        w: 604800, // week
        d: 86400, // day
        h: 3600,  // hour
        min: 60, // minute
        sec: 1  // second
      };

      let quotient: number;
      if (!!intervals) {
        for (const interval in intervals) {
          if (intervals.hasOwnProperty(interval)) {
            quotient = Math.floor(seconds / intervals[interval]);

            if (quotient > 0) {
              return quotient + interval;
            }
          }
        }
      }
    }
    return value;
  }

}
