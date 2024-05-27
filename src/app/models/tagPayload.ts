import { KeyValue } from "@angular/common";

export interface TagPayload {
    filterIngredients: KeyValue<number,string>[];
    filterTypes: KeyValue<number,string>[];
}