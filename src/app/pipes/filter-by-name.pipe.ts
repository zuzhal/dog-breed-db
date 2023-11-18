import { Pipe, PipeTransform } from '@angular/core';
import { IDog } from '../model/dog';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(dogs: IDog[] | null, searchName: string): IDog[] {
    
    if (!dogs) [];
    
    searchName = searchName.trim().toLowerCase();
    if(!searchName.length) dogs

    return dogs!.filter(dog => {
      return dog.name.toLowerCase().includes(searchName);
    });
  }
}
