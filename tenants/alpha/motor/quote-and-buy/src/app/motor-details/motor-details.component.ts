import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@core/utilities';

@Component({
  imports: [CommonModule, TranslatePipe],
  selector: 'app-motor-details',
  templateUrl: `motor-details.component.html`,
  styleUrl: 'motor-details.component.css',
})
export class MotorDetailsComponent {
  currentLang: string;
  supportedLangs: string[];

  constructor(private translate: TranslateService) {
    this.supportedLangs = this.translate.availableLanguages;
    this.currentLang =
      this.translate.currentLang || this.translate.defaultLanguage;

    this.translate.lang$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  async toggleLanguage() {
    const currentIndex = this.supportedLangs.indexOf(this.currentLang);
    const nextIndex = (currentIndex + 1) % this.supportedLangs.length;
    await this.translate.setLang(this.supportedLangs[nextIndex]);
  }
}
