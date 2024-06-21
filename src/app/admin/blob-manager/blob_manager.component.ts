import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlobService } from 'src/app/services';

@Component({
  selector: 'app-blob-manager',
  templateUrl: './blob_manager.component.html',
  styleUrls: ['./blob_manager.component.scss']
})
export class BlobManagerComponent implements OnInit{

    containerPath:any = {};
    keys:string[] = [];
    keySelected:string = '';
    blobSelected:string = 'Title';
    sasToken:string = '';
    imgSrc:string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s';

    constructor(private blobService:BlobService) {}

    ngOnInit() {
        this.blobService.getContainerPath().subscribe((data) => {
            const {containers,sas} = data;
            this.sasToken = sas;
            this.containerPath = containers;
            this.keys = Object.keys(this.containerPath);
            // Object.keys(this.containerPath).forEach((key) => {
            //     console.log(key, this.containerPath[key]);
            // });
        });
    }

    onClickCard(blobName:string){
        this.blobSelected = blobName;
        this.imgSrc = `https://interndev.blob.core.windows.net/${this.keySelected}/${blobName}?${this.sasToken}`;
    }

}
