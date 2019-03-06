
export class User{

  constructor(){
  }

  public Roles:any           = [{'cod':'', 'Name':'', 'v':false}];
  public Organization:string = '';

  public Nombre:string   = '';
  public Apellido:string = '';
  public Email:string    = '';

  public Pass:string  = '';
  public RPass:string = '';

  public errors:string = '';

  public setRoleList(rl:any = []){
    this.Roles = [];

    for(let c=0; c<rl.length; c++){  this.Roles.push({ 'cod':rl[c].code, 'Name':rl[c].Name, 'v':false });  }
  }

  isValid(){
    return true;
  }
}
