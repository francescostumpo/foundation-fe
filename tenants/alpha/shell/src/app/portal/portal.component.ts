import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@core/utilities';
import {
  NxHeaderActionsDirective,
  NxHeaderBrandDirective,
  NxHeaderComponent,
  NxHeaderNavigationComponent,
} from '@aposin/ng-aquila/header';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NdbxIconModule } from '@allianz/ngx-ndbx/icon';
import {
  NxCardComponent,
  NxCardMainLinkDirective,
  NxCardSecondaryInfoDirective,
} from '@aposin/ng-aquila/card';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe,
    NxHeaderActionsDirective,
    NxHeaderComponent,
    NxFormfieldModule,
    NxDropdownComponent,
    NxDropdownItemComponent,
    FormsModule,
    NdbxIconModule,
    NxHeaderBrandDirective,
    NxHeaderNavigationComponent,
    NxCardComponent,
    NxHeadlineComponent,
    NxCardMainLinkDirective,
    NxCardSecondaryInfoDirective,
    NxLinkComponent,
  ],
  selector: 'app-link',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
})
export class PortalComponent {
  readonly supportedLangs: string[];

  protected currentLang: string;
  protected langs: { label: string; id: string }[] = [
    {
      label: 'English',
      id: 'en',
    },
    {
      label: 'Italiano',
      id: 'it',
    },
  ];
  protected currentLangDropdown: { label: string; id: string } = this.langs[0];

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
