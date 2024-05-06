import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'shared-button',
  template: `
    <button [ngClass]="buttonClasses" type="submit" (click)="onClick()" [disabled]="disabled"><ng-content></ng-content></button>`,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
  onClick() {
    this.clicked.emit();
  }

  @Input() type: string = "normal";
  @Input() size: string = "medium";
  @Input() disabled: boolean = false;

  get buttonClasses(): any {
    return {
      [this.type]: true,
      [this.size]: true,
      'disabled': this.disabled
    };
  }
  
  constructor() {
  }

  ngOnInit(): void {

  }

}
