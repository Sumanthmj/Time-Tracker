import { InjectionToken } from '@angular/core';

export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr {
  success(msg: string, title: string): any
  info(msg: string, title: string): any
  warning(msg: string, title: string): any
  error(msg: string, title: string): any
}