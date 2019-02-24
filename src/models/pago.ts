export class Pago{
  public monto:number       = 0;
  public descripcion:string = '';
  public email:string       = '';
  
  public id:number          = 0;
  public token:string       = '':

  public paymentMethodId:string = '';
  public errors                 = '';

  public isValid(){
      return true;
  }
}
