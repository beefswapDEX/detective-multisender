import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(str: string): string {
    let length = str.length;
    if (length > 5) {
      return str.substring(0,3)+"..."+str.substring(length-4, length)
    }
    return "";
  }

}
