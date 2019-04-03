
export class User{

  constructor(){
  }

  public Rol_list:any        = [{'cod':'', 'Name':'', 'v':false}];

  public personal_info = {'FirstName':'', 'LastName':'', 'email':''};
  public id:string     = '';
  public organization  = '';

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
    return true;
  }
}
