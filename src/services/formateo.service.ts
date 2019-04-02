//Este componete tiene como finalida centralizar el formateo de datos generícos
import {Injectable} from '@angular/core';

@Injectable()
export class FormateoService {

  constructor() { }

  private DECIMAL_SEPARATOR:string = ".";
  private GROUP_SEPARATOR:string   = ",";
  private CUIL_SEPARATOR:string    = '-';

  private ISODate:string  = '';
  public anio:number    = 0;
  public mes:number     = 0;
  public dia:number     = 0;
  public hora:number    = 0;
  public minuto:number  = 0;
  public segundo:number = 0;

  public MAYOR = 1;
  public MENOR = -1;
  public IGUAL = 0;

  /////////////////////////
  //// FECHAS          ////
  getFormatedDate(f = ''){
      if (f != ''){
        let d : any = this.getArrayFDate(f);
        return d[2]+"/"+d[1]+"/"+d[0];
      }
  }

  getArrayFDate(f){
    let d : any = f.split("T")[0];
    return d.split("-");
  }

  setIsoString(f){
    this.ISODate = f;
    let fecha    = f.split('T')[0].split('-');
    let hora     = f.split('T')[1].split('-')[0].split(':');
    this.anio    = fecha[0];
    this.mes     = fecha[1];
    this.dia     = fecha[2];
    this.hora    = hora[0];
    this.minuto  = hora[1];
    this.segundo = hora[2];
  }

  //////////////////////////
  //// MONEDAS          ////
  getMoney(valString, signo=1) {
    if (!valString) {
        return '';
    }
    let val = valString.toString();
    let parts = this.unFormatMoney(val).split(this.DECIMAL_SEPARATOR);
    if(parts[1]) { parts[1] = parts[1].slice(0, 2);}
    if(val.slice(-1)===this.DECIMAL_SEPARATOR) {parts[0]+=this.DECIMAL_SEPARATOR;}
    let s = '';
    if(signo == -1){
      s='-';
    }
    return "$ "+s+parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.GROUP_SEPARATOR) + (!parts[1] ? '' :this.DECIMAL_SEPARATOR+ parts[1]);
  }

  unFormatMoney(val) {
      if (!val) {
          return '';
      }
      val = val.replace(/^0+/, '');
      let s:string='';
      if (this.GROUP_SEPARATOR === ',') {
        s=val.replace(/[^0-9\.]/g, '');
      } else { s=val.replace(/[^0-9,]/g, '');}
      return s;
  }

  getFloat(val) {
      if (!val) {
          return '';
      }
      val = val.replace(/^0+/, '');
      let s:string='';
      s=val.replace(/[^0-9,]/g, '');
      s=s.replace(',','.');
      return s;
  }

  //////////////////////////
  //// CUIL            /////
  getCuilString(c){
    let s = String(c);
    return s.substring(0, 2) + this.CUIL_SEPARATOR + s.substring(2, s.length-1) + this.CUIL_SEPARATOR + s[s.length-1];
  }
}
