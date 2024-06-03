import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-text-box',
  template: `
  <input [type]="type" [(ngModel)]="valueModel" [class]="size" [placeholder]="placeholder">`,
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {

  @Input() type: string = 'text';
  @Input() size: string = 'medium';
  @Input() placeholder: string = '';

  value = "";

  @Input() 
  get valueModel() {
    return this.value;
  };

  @Output() valueModelChange = new EventEmitter();
  set valueModel(val) {
    this.valueModelChange.emit(val);
  }

  constructor() { }

  ngOnInit(): void {

  }


}
