import { Component, Input } from '@angular/core';

interface Payload {
  [key: string]: string;
}

@Component({
  selector: 'shared-plain-text-card',
  templateUrl: './plain-text-card.component.html',
  styleUrls: ['./plain-text-card.component.scss']
})
export class PlainTextCardComponent {

  @Input() title: string="Title";
  @Input() payload: Payload = {propertyA: "A", propertyB: "B"};

  get payloadKeys(): string[] {
    return Object.keys(this.payload);
  }

  constructor() { }

}
