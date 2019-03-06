
export class User{

  constructor(){
  }

  public Rol:string          = '';
  public Organization:string = '';

  public Nombre:string   = '';
  public Apellido:string = '';
  public Email:string    = '';

  public Pass:string  = '';
  public RPass:string = '';

  public errors:string = '';

  isValid(){
    return true;
  }
}
