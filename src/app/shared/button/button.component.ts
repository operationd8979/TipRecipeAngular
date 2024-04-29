import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'components-button',
  template: `
    <button [class.primary]="primary" [class.outline]="outline" [class.disabled]="disabled" (click)="onClick()"><ng-content></ng-content></button>`,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    if(this.disabled) return;
    this.clicked.emit();
  }

  @Input() type: string = "normal";
  @Input() disabled: boolean = false;
  primary: boolean = false;
  outline: boolean = false;
  
  constructor() {
  }

  ngOnInit(): void {
    if(this.type === "primary") {
      this.primary = true;
    } else if(this.type === "outline") {
      this.outline = true;
    }
    if(this.disabled) {
      this.primary = false;
      this.outline = false;
    }
  }

}
