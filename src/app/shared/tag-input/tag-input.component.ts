import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TagPayload } from 'src/app/models';

@Component({
  selector: 'shared-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit{

  tagPageLoad: TagPayload[] = [{payload: [], filter: []}];
  hintString: string = '';
  lastTag: string = '';

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

  @ViewChild('hintTag') hintTag!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  onChange($event: any){
    const types = this.tagPageLoad[0].payload;
    const filterTypes = this.tagPageLoad[0].filter;
    const ingredients = this.tagPageLoad[1].payload;
    const filterIngredients = this.tagPageLoad[1].filter;
    const value = $event.target.value;
    const currentChracter = $event.data;
    const currentTags = value.split(',');
    this.lastTag = currentTags[currentTags.length - 1].trim();
    if(this.lastTag === ''){
      this.hintString = '';
      return;
    }
    let hintTags = [];
    hintTags = ingredients.filter((ingredient) => {
      return ingredient.value.toLowerCase().includes(this.lastTag.toLowerCase());
    });
    hintTags = hintTags.concat(types.filter((type) => {
      return type.value.toLowerCase().includes(this.lastTag.toLowerCase());
    }));
    let stringValues = '';
    hintTags.filter((tag) => {
      stringValues+= tag.value + ', ';
    });
    this.hintString = stringValues;


    this.tagPayModel = [{payload: types, filter: filterTypes}, {payload: ingredients, filter: filterIngredients}];
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case ',':
        console.log('Comma key pressed');
        break;
      case 'Enter':
        console.log('Enter key pressed');
        break;
      case 'Backspace':
        console.log('Backspace key pressed');
        break;
    }
  }

}
