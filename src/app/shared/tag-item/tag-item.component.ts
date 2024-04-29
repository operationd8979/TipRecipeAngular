import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss']
})
export class TagItemComponent {


  @Input() tag: string = 'item';
  @Input() color: string = 'red';

  constructor() { }


}
