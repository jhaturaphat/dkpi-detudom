import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(total_keep: number = 0, frequency_id:string = ""): any{  
    if((frequency_id == 'M') && total_keep == 12 ) return '<i class="fa fa-check text-primary"></i>';
    if((frequency_id == 'Q') && total_keep == 4 ) return '<i class="fa fa-check text-primary"></i>';
    if((frequency_id == 'Y') && total_keep == 1 ) return '<i class="fa fa-check text-primary"></i>';
    return `<i class="fa fa-exclamation-triangle text-danger"> ${total_keep}</i>`;
  }

}
