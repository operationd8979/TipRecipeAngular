import { KeyValue } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { config } from "src/app/constants";
import { LoadingService } from "../LoadingService";
import { finalize, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class BlobService {

    constructor(private httpClient: HttpClient,private loadingService: LoadingService) {
        
    }

    getContainerPath() {
        this.loadingService.show();
        return this.httpClient.get<any>(config.serverUrl + 'blob/containers').pipe(
            finalize(() => {
              this.loadingService.hide();
            })
          );
    }

}