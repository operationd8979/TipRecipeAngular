import { Component, OnInit } from '@angular/core';
import { TagPayload } from 'src/app/types';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  query: string = '';
  tagValue: string = '';
  types : KeyValue<string, string>[] = [{key: "1", value: 'chính'}, {key: "2", value: 'tráng miệng'}, {key: "3", value: 'món Việt'}];
  ingredients: KeyValue<string, string>[] = [{key: "1", value: 'thịt'}, {key: "2", value: 'rau'}, {key: "3", value: 'cá'}, {key: "4", value: 'tôm'}];
  filterTypes: KeyValue<string, string>[] = [];
  filterIngredients: KeyValue<string, string>[] = [];

  get tagPayload(): TagPayload[] {
    return [
      {payload: this.types, filter: this.filterTypes},
      {payload: this.ingredients, filter: this.filterIngredients}
    ];
  }
  set tagPayload(val) {
    this.types = val[0].payload;
    this.filterTypes = val[0].filter;
    this.ingredients = val[1].payload;
    this.filterIngredients = val[1].filter;
  }

  constructor() { }

  ngOnInit(): void {
  }

  callApiSearch() {
    alert('callApiSearch');
  }


}
