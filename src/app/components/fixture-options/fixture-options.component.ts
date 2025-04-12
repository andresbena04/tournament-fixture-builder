import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fixture-options',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './fixture-options.component.html',
  styleUrl: './fixture-options.component.css'
})
export class FixtureOptionsComponent {

  @Input() nameCompetetion!: string
  @Input() numberOfTeams: number = 4;
  @Input() useCustomNames: boolean = false;
  @Input() homeAndAway: boolean = false;

  @Output() nameCompetetionChange = new EventEmitter<string>();
  @Output() numberOfTeamsChange = new EventEmitter<number>();
  @Output() useCustomNamesChange = new EventEmitter<boolean>();
  @Output() homeAndAwayChange = new EventEmitter<boolean>();
}
