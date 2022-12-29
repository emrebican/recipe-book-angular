import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() NavigatePage = new EventEmitter<string>();

  collapsed: boolean = true;

  onSelect(selection: string) {
    this.NavigatePage.emit(selection);
  }
}
