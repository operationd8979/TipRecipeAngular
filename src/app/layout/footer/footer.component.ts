import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-footer',
  template: `
  <footer class="wrapper">
    <p> &copy; 4/2024 TipRecipeAngular | VoHoangDung </p>
  </footer>`,
  styles: [`
  .wrapper {
    padding: var(--default-medium-zone);
    background-color: var(--darkPrimary);
    text-align: center;
    p{
        color: var(--white);
    }
  }`]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
