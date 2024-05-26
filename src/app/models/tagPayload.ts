import { KeyValue } from "@angular/common";

export interface TagPayload {
    payload: KeyValue<number,string>[];
    filter: KeyValue<number,string>[];
}