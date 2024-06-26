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
            this.keySelected = this.keys[0];
            this.onClickCard(this.containerPath[this.keySelected][0]);
        });
    }

    onClickCard(blobName:string){
        this.blobSelected = blobName;
        this.imgSrc = `https://interndev.blob.core.windows.net/${this.keySelected}/${blobName}?${this.sasToken}`;
    }

    onClickUpload(){
        console.log("abc");
    }

}
