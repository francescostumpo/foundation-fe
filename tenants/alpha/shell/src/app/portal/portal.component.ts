import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@core/utilities';

@Component({
  imports: [RouterModule, TranslatePipe],
  selector: 'app-link',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
})
export class PortalComponent {}
