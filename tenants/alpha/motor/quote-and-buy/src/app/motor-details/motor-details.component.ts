import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@core/widgets';

@Component({
  imports: [CommonModule, ButtonComponent],
  selector: 'app-motor-details',
  templateUrl: `motor-details.component.html`,
  styleUrl: 'motor-details.component.css',
})
export class MotorDetailsComponent {}
