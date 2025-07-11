import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@core/utilities';

@Component({
  imports: [CommonModule, TranslatePipe],
  selector: 'app-motor-details',
  templateUrl: `motor-details.component.html`,
  styleUrl: 'motor-details.component.css',
})
export class MotorDetailsComponent {}
