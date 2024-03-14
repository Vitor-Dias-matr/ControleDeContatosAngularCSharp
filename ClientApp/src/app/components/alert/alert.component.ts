import { Component } from '@angular/core';
import { AlertService } from '../../Services/Alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  constructor(public alertService: AlertService) { }
}
