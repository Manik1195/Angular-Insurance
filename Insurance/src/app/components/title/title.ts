import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Iusers } from '../../iusers';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.css',
  standalone: true,
})
export class Title implements OnInit, OnChanges {
  @Input() user!: Iusers;
  @Output() success: EventEmitter<string> = new EventEmitter();
  @Input() names = '';
  @Input() msg = '';
  name = 'Manik';
  email = 'swordmanik@gmail.com';
  age = 20;
  mobile = 9360507474;
  value = 1;
  ngOnInit(): void {
    console.log('names:', this.names);
  }
  ngOnChanges() {
    console.log('names:', this.names);
  }
  one() {
    this.value = 1;
  }
  two() {
    this.value = 2;
    this.success.emit(this.email);
  }
  three() {
    this.value = 3;
  }
  four() {
    this.value = 4;
  }
}
