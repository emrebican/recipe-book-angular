import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string;
  // @Output() close = new EventEmitter<void>();
  @Output() close = new Subject<void>();

  onClose() {
    this.close.next();
  }
}
