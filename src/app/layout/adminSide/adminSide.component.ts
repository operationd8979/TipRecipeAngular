import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-adminSide',
  template: `
  <aside class="wrapper">
        <div class="header">
            <span class="text-2xl font-bold uppercase" routerLink="/admin">Admin</span>
        </div>
        <nav class="container">
            <ul>
                <li><a routerLink="/admin">Dashboard</a></li>
                <li><a routerLink="dishManager">Diskes manage</a></li>
                <li><a routerLink="blobManager">Blobs manage</a></li>
            </ul>
        </nav>
    </aside>`,
    styleUrls: ["./adminSide.component.scss"]
})
export class AdminSideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
