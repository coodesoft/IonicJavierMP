export class Pago{
  public monto:string       = "$ 0";
  public descripcion:string = '';
  public email:string       = '';

  public id:number          = 0;
  public token:string       = '';

  public paymentMethodId:string = '';
  public errors                 = '';
  public getErrors(){ return this.errors; }


  private GROUP_SEPARATOR  = '.';

  public isValid(){
      if ( Number(this.unFormat(this.monto)) <= 0 ){ this.errors = 'El monto ingresado debe ser mayor a cero'; return false; }
      if ( this.descripcion == '' ){ this.errors = 'Es necesario completar la descripción'; return false;    }
      if ( this.email == ''       ){ this.errors = 'Es necesario ingresar un E-Mail'; return false;    }
      return true;
  }

  public deleteExtraField(){
    delete this.errors;
    delete this.GROUP_SEPARATOR;
  }

  private unFormat(val) { //[modificar] esto tiene que estar en un solo lugar!
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
}
