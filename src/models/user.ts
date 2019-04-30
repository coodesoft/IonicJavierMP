
export class User{

  constructor(){
  }

  public Rol_list:any        = [{'cod':'', 'Name':'', 'v':false}];

  public personal_info = {'FirstName':'', 'LastName':'', 'email':''};
  public id:string     = '';
  public organization  = '';
  public operation     = '';

  public Pass:string  = '';
  public RPass:string = '';

  private errors:string = '';
  public getErrors(){ return this.errors; }

  public setParams(r){
    this.clearParams();
    this.setParamsRoleList(r.roles);
    if (r.hasOwnProperty('id'))                     { this.id                      = r.id; }
    if (r.personal_info.hasOwnProperty('FirstName')){ this.personal_info.FirstName = r.personal_info.FirstName; }
    if (r.personal_info.hasOwnProperty('LastName')) { this.personal_info.LastName  = r.personal_info.LastName; }
    if (r.personal_info.hasOwnProperty('email'))    { this.personal_info.email     = r.personal_info.email; }

    if (r.organization.hasOwnProperty('OrganizationId')) { this.organization  = r.organization.OrganizationId; }
  }

  public clearParams(){
    this.personal_info = {'FirstName':'', 'LastName':'', 'email':''};
    this.id           = '';
    this.Pass         = '';
    this.RPass        = '';
  }

  public setRoleList(rl:any = []){
    this.Rol_list = [];
    for(let c=0; c<rl.length; c++){  this.Rol_list.push({ 'cod':rl[c].id, 'Name':rl[c].Name, 'v':false });  }
  }

  public setParamsRoleList(rl:any){
    for(let c=0; c<rl.length; c++){
      for (let d=0; d < this.Rol_list.length; d++){
        if (this.Rol_list[c].cod == rl[c].id){ this.Rol_list[c].v = true; break; }
      }
    }
  }

  isValid(){
    if (this.personal_info.FirstName == '') { this.errors = 'Es necesario completar el campo "Nombre"';   return false; }
    if (this.personal_info.LastName == '')  { this.errors = 'Es necesario completar el campo "Apellido"'; return false; }
    if (this.personal_info.email == '')     { this.errors = 'Es necesario completar el campo "Email"';    return false; }
console.log(this.operation);
    if ( (this.Pass != this.RPass) && (this.RPass != '' || this.Pass != '') ) { this.errors = 'Las contraseñas ingresadas no coinciden';    return false; }
    if ( this.operation == 'NUser' && this.Pass == '') { this.errors = 'Es necesario especificar una contraseña';    return false; }

    if (this.organization == '') { this.errors = 'Es necesario especificar una organización de pertenencia';    return false; }

    return true;
  }
}
