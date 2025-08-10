
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cinema-search',
  templateUrl: './cinema-search.component.html',
  styleUrl: './cinema-search.component.css'
})
export class CinemaSearchComponent {

  @Input() searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();

  private searchSubject = new Subject<string>();
  private subscription: Subscription;

  constructor() {
    // add a 300 s as time before start search
    this.subscription = this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.searchTermChange.emit(value);
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
