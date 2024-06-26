import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-footer',
  template: `
  <footer class="wrapper">
    <p> &copy; 4/2024 TipRecipeAngular | VoHoangDung </p>
  </footer>`,
  styles: [`
  .wrapper {
    padding: var(--default-small-zone);
    background-color: var(--color-dark);
    text-align: center;
    p{
        font-size: var(--default-mini-font-size);
        color: var(--white);
    }
  }`]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
