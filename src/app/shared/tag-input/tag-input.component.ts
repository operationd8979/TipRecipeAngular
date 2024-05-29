import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TagPayload } from 'src/app/models';

@Component({
  selector: 'shared-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit{

  tagPageLoad: TagPayload = {filterIngredients: [], filterTypes: []};
  tagValue: string = '';
  hintString: string = '';
  lastItem: {action:string,value:KeyValue<number,string>} = {action:"",value:{key:-1,value:""}}; 
  @Input() types: KeyValue<number,string>[] = [];
  @Input() ingredients: KeyValue<number,string>[] = [];

  @Input() 
  get tagPayModel() {
    return this.tagPageLoad;
  }
  @Output() tagPayModelChange = new EventEmitter();
  set tagPayModel(val) {
    this.tagPageLoad = val;
    this.tagPayModelChange.emit(this.tagPageLoad);
  }

  @ViewChild('hintTag') hintTag!: ElementRef;
  @ViewChild('tagInput') tagInput!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault();
      return;
    }
    if (event.ctrlKey && event.key === 'Backspace') {
      event.preventDefault();
      return;
    }
    let value = this.tagInput.nativeElement.value;
    switch (event.key) {
      case ',':
        event.preventDefault();
        this.processTagInput(event,value);
        break;
      case 'Enter':
        event.preventDefault();
        this.processTagInput(event,value);
        break;
      case 'Backspace':
        this.processTagInput(event,value.substring(0,value.length-1));
        break;
      case 'Delete':
        console.log('Delete key pressed');
        break;
      default:
        this.processTagInput(event,value+event.key);
    }
  }

  processTagInput(event: KeyboardEvent,value:string){
    const currentTags = value.split(",");
    const lastTag = currentTags[currentTags.length - 1].trim();
    if(lastTag === ""){
      this.hintString = "";
      return;
    }
    const ingredientTags = this.ingredients.filter((ingredient) => {
      return ingredient.value.toLowerCase().includes(lastTag.toLowerCase());
    });
    const typeTags = this.types.filter((type) => {
      return type.value.toLowerCase().includes(lastTag.toLowerCase());
    });
    const hintTags = ingredientTags.concat(typeTags);
    if(hintTags.length === 1){
      if(this.ingredients.some(i=>i.value==hintTags[0].value)){
        this.lastItem.action="ingredient";
        this.lastItem.value = hintTags[0];
      }
      else{
        this.lastItem.action="type";
        this.lastItem.value = hintTags[0];
      }
    }
    else{
      this.lastItem = {action:"",value:{key:-1,value:""}}; 
    }
    switch (event.key) {
      case ',':
        this.insertTag();
        break;
      case 'Enter':
        this.insertTag();
        break;
      case 'Backspace':
        this.deleteTag();
        this.insertHint(hintTags);
        break;
      case 'Delete':
        event.preventDefault();
        break;
      default:
        this.insertHint(hintTags);
    }
    
  }

  insertTag():void{
    const filterTypes = this.tagPageLoad.filterTypes;
    const filterIngredients = this.tagPageLoad.filterIngredients;
    if(this.lastItem.action=="ingredient"){
      if(!filterIngredients.some(i=>i.value===this.lastItem.value.value)){
        const index = this.tagInput.nativeElement.value.lastIndexOf(',');
        this.tagInput.nativeElement.value = this.tagInput.nativeElement.value.substring(0,index+1);
        filterIngredients.push(this.lastItem.value);
        this.hintString = "";
        this.tagInput.nativeElement.value+= this.lastItem.value.value+",";
      }
    }
    else if(this.lastItem.action=="type"){
      if(!filterTypes.some(i=>i.value===this.lastItem.value.value)){
        const index = this.tagInput.nativeElement.value.lastIndexOf(',');
        this.tagInput.nativeElement.value = this.tagInput.nativeElement.value.substring(0,index+1);
        filterTypes.push(this.lastItem.value);
        this.hintString = "";
        this.tagInput.nativeElement.value+= this.lastItem.value.value+",";
      }
    }
  }

  deleteTag():void{
    const filterTypes = this.tagPageLoad.filterTypes;
    const filterIngredients = this.tagPageLoad.filterIngredients;
    if(this.lastItem.action=="ingredient"){
      if(filterIngredients.some(i=>i.key==this.lastItem.value.key)){
        filterIngredients.splice(filterIngredients.indexOf(this.lastItem.value),1);
      }
    }
    else if(this.lastItem.action=="type"){
      if(filterTypes.some(i=>i.key==this.lastItem.value.key)){
        filterTypes.splice(filterTypes.indexOf(this.lastItem.value));        
      }
    }
  }

  insertHint(hintTags:KeyValue<number,string>[]):void{
    let finalHintString = "";
    hintTags.filter(tag=>{
      finalHintString+=tag.value+", ";
    })
    this.hintString = finalHintString;
  }

}
