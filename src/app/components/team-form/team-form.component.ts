import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css',
})
export class TeamFormComponent implements OnChanges {

  @Input() numberOfTeams = 4;
  @Output() teamNamesChange = new EventEmitter<string[]>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      teams: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['numberOfTeams']) {
      this.setTeamControls(this.numberOfTeams);
    }
  }

  get teamControls(): FormArray {
    return this.form.get('teams') as FormArray;
  }

  private setTeamControls(count: number) {
    const teamsArray = this.fb.array([]);
    for (let i = 0; i < count; i++) {
      teamsArray.push(this.fb.control(''));
    }
    this.form.setControl('teams', teamsArray);
    this.emitChange();
  }

  emitChange() {
    this.teamNamesChange.emit(this.teamControls.value);
  }
}
