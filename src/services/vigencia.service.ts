
import {Injectable} from '@angular/core';

@Injectable()
export class VigenciaService {

  constructor() { }

  private dateToArray(time: Date){
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var year = time.getFullYear();
    return {
      'd': day,
      'm': month,
      'y': year
    }
  }

  prettyMonth(month: any){
    return (month < 10) ? "0" + month : month;
  }

  prettyDay(day: any){
    return (day < 10) ? "0" + day : day;
  }

  getPrettyDate(time: Date){
    var date = this.dateToArray(time);

    var currentMonth = this.prettyMonth(date['m']);
    var currentDay = this.prettyMonth(date['d']);

    return date['y'] + "-" + currentMonth + "-" + currentDay;
  }

  getMinInicialDate(time: Date){
    return this.getPrettyDate(time);
  }

  getMaxInicialDate(time: Date){
    var tmp = new Date(time.getTime());
    tmp.setMonth(tmp.getMonth() + 3);
    return this.getPrettyDate(tmp);
  }

  getMaxFinalDate(time: Date){
    var date = this.dateToArray(time);
    var currentMonth = this.prettyMonth(date['m']);
    var currentDay = this.prettyMonth(date['d']);

    return (date['y'] + 1) + "-" + currentMonth + "-" + currentDay;
  }
}
