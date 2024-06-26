import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/models';
import { ToastService } from 'src/app/services';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  removeToast(toast: Toast) {
    this.toastService.removeToast(toast);
  }

  capitalizeFirstLetter(s:string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

}
