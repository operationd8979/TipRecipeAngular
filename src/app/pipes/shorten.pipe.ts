import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform{
    transform(value: string, length: number) {
        return value.length > length ? value.slice(0,length) + '...' : value;
    }
}