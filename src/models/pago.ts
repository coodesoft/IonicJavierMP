export class Pago{
  public monto:number       = 0;
  public descripcion:string = '';
  public email:string       = '';

  public id:number          = 0;
  public token:string       = '';

  public paymentMethodId:string = '';
  public errors                 = '';

  public isValid(){
      if ( this.monto <= 0        ){ this.errors = 'El monto ingresado debe ser mayor a cero'; return false; }
      if ( this.descripcion == '' ){ this.errors = 'Es necesario completar la descripción'; return false;    }
      if ( this.email == ''       ){ this.errors = 'Es necesario ingresar un E-Mail'; return false;    }
      return true;
  }

  public deleteExtraField(){
    delete this.errors;
  }
}
