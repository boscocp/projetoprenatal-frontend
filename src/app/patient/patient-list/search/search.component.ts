import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @Output() onTyping = new EventEmitter<string>();
  filter: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
