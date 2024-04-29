import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-text-box',
  template: `
  <input [type]="type" [(ngModel)]="valueModel" [class]="size">`,
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {

  @Input() type: string = 'text';
  @Input() size: string = 'medium';

  value = "";

  @Input() 
  get valueModel() {
    return this.value;
  };

  @Output() valueModelChange = new EventEmitter();
  set valueModel(val) {
    this.value = val;
    this.valueModelChange.emit(this.value);
  }

  constructor() { }

  ngOnInit(): void {
    if(this.size === 'small') {
      
    }
  }


}
