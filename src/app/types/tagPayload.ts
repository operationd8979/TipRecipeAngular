import { KeyValue } from "@angular/common";

export interface TagPayload {
    payload: KeyValue<string,string>[];
    filter: KeyValue<string,string>[];
}