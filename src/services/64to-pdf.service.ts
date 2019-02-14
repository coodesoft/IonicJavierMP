import { Injectable } from '@angular/core';

export class B64toPDFService {

  constructor() { }

  getPDF(model){
    this.savebase64AsPDF("",model.Nombre,model.Contenido,'application/pdf');
  }

  private savebase64AsPDF(folderpath,filename,content,contentType){
     contentType = contentType || '';
     var sliceSize = sliceSize || 512;

     var byteCharacters = atob(content);
     var byteArrays = [];

     for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
       var slice = byteCharacters.slice(offset, offset + sliceSize);

       var byteNumbers = new Array(slice.length);
       for (var i = 0; i < slice.length; i++) {
         byteNumbers[i] = slice.charCodeAt(i);
       }

       var byteArray = new Uint8Array(byteNumbers);
       byteArrays.push(byteArray);
     }
     var blob = new Blob(byteArrays, {type: contentType});
     var reader = new FileReader();
     reader.onload = function (event){
       var save=document.createElement('a');
       save.href = (event.target as any).result;
       save.target = '_blank';
       save.download = filename;
       var clickEvent = new MouseEvent('click',{
         'view':window,'bubbles':true,'cancelable':true
       });
       save.dispatchEvent(clickEvent);
       (window.URL).revokeObjectURL(save.href);
     }
     reader.readAsDataURL(blob);
  }
}
