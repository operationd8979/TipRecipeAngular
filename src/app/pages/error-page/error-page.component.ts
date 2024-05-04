import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit{

  message: string = 'Page not found!';

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.message = data['message'];
    });
  }

}
