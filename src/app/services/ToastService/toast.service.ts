import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from 'src/app/models';


@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  showToast(toast: Toast) {
    const toasts = [...this.toastsSubject.value, toast];
    this.toastsSubject.next(toasts);

    if (toast.duration) {
      setTimeout(() => {
        this.removeToast(toast);
      }, toast.duration);
    }
  }

  removeToast(toastToRemove: Toast) {
    const toasts = this.toastsSubject.value.filter(toast => toast !== toastToRemove);
    this.toastsSubject.next(toasts);
  }

  showSuccess(message: string) {
    this.showToast({
      message: message,
      type: 'success',
      duration: 3000
    });
  }

  showError(message: string) {
    this.showToast({
      message: message,
      type: 'error',
      duration: 3000
    });
  }

  showInfo(message: string) {
    this.showToast({
      message: message,
      type: 'info',
      duration: 3000
    });
  }

  showSystemMessage(message: string) {
    const toast:Toast = {
      message: message,
      type: 'info'
    };
    this.showToast(toast);
    return toast;
  }


}
