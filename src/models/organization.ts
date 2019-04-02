
export class Organization{

  constructor(){
  }

  private errors:string = '';
  public getErrors(){ return this.errors; }

  isValid(){
    return true;
  }
}
