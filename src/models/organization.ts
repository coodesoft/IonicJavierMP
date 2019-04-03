
export class Organization{

  public Code:string = '';
  public Name:string = '';
  public Id:string   = '';

  constructor(){}

  public setParams(r){
    if (r.hasOwnProperty('id'))   { this.Id = r.id; }
    if (r.hasOwnProperty('Code')) { this.Code = r.Code; }
    if (r.hasOwnProperty('Name')) { this.Name = r.Name; }
  }

  private errors:string = '';
  public getErrors(){ return this.errors; }

  isValid(){
    return true;
  }
}
