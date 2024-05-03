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
    const lastTag = currentTags[currentTags.length - 1];
    let hintTags = [];
    hintTags = ingredients.filter((ingredient) => {
      return ingredient.value.toLowerCase().includes(lastTag.toLowerCase());
    });
    hintTags = hintTags.concat(types.filter((type) => {
      return type.value.toLowerCase().includes(lastTag.toLowerCase());
    }));
    let stringValues = '';
    hintTags.filter((tag) => {
      stringValues+= tag.value + ', ';
    });
    this.hintTag.nativeElement.innerHTML = stringValues;
    // if($event.inputType==="insertLineBreak"){
    //   alert('Enter');
    // }
    // if($event.inputType==="deleteContentBackward"){
    //   alert('Backspace');
    // }
    // if($event.inputType==="deleteContentForward"){
    //   alert('Delete');
    // }
    // if($event.inputType==="insertText"){
    //   if(currentChracter === ',')
    //     alert(',');
    // }
    this.tagPayModel = [{payload: types, filter: types}, {payload: ingredients, filter: ingredients}];
  }

}
