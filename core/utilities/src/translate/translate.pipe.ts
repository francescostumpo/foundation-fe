import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { TranslateService } from './translate.service';
import { Subscription } from 'rxjs';

@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey = '';
  private lastValue = '';
  private sub: Subscription;

  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.sub = this.translate.lang$.subscribe(() => {
      this.lastValue = this.translate.translate(this.lastKey);
      this.cdr.markForCheck();
    });
  }

  transform(key: string, params?: Record<string, any>): string {
    if (key !== this.lastKey || params) {
      this.lastKey = key;
      this.lastValue = this.translate.translate(key, params);
    }
    return this.lastValue;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
