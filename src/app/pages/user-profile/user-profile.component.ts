import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  newPassword: string = '';

  user : any = {
    Name: "operationddd",
    Email: "operationddd@gmail.com",
    Created_At: "2024-04-05 23:09:26",
    Updated_At: "2024-04-05 23:09:26",
    Role: "USER"
  }

  constructor() { }

}
