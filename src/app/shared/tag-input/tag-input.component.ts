import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TagPayload } from 'src/app/models';

@Component({
  selector: 'shared-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit{

  tagPageLoad: TagPayload[] = [{payload: [], filter: []}];

  @Input() 
  get tagPayModel() {
    return this.tagPageLoad;
  }
  @Output() tagPayModelChange = new EventEmitter();
  set tagPayModel(val) {
    this.tagPageLoad = val;
    this.tagPayModelChange.emit(this.tagPageLoad);
  }

  tagValue: string = '';

  @Input()
  get valueModel() {
    return this.tagValue;
  }

  @Output() valueModelChange = new EventEmitter();
  set valueModel(val) {
    this.tagValue = val;
    this.valueModelChange.emit(this.tagValue);
  }

  constructor() { }

  ngOnInit(): void {
  }
  onChange($event: any){
    // let char = $event.data;
    // let value = $event.target.value;
    // let tags = value.split(',');
    // let finalTags = tags[tags.length - 1];
    // //check if the last character is a comma or enter
    // if(char === ',' || char === 'Enter'){
    //   if(finalTags.trim() !== ''){
    //     this.tagPageLoad[0].payload.push(finalTags.trim());
    //     this.tagValue = '';
    //   }
    // }
  }

}
