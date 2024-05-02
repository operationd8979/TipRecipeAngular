import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from 'src/app/models';

@Component({
  selector: 'app-detail-dish',
  templateUrl: './detail-dish.component.html',
  styleUrls: ['./detail-dish.component.scss']
})
export class DetailDishComponent implements OnInit {


  constructor(private route:ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
    });
  }

}
