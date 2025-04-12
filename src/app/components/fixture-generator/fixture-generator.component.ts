import { Component } from '@angular/core';
import { FixtureDisplayComponent } from '../fixture-display/fixture-display.component';
import { FixtureOptionsComponent } from '../fixture-options/fixture-options.component';
import { TeamFormComponent } from '../team-form/team-form.component';
import { FixtureService } from '../../services/fixture.service';
import { StatePersistenceService } from '../../services/state-persistence.service';

@Component({
  selector: 'app-fixture-generator',
  standalone: true,
  imports: [FixtureDisplayComponent, FixtureOptionsComponent, TeamFormComponent],
  templateUrl: './fixture-generator.component.html',
  styleUrl: './fixture-generator.component.css'
})
export class FixtureGeneratorComponent {

  nameCompetetion!: string
  numberOfTeams = 4;
  useCustomNames = false;
  homeAndAway = false;
  teamNames: string[] = [];
  fixture: { matchday: number; matches: string[] }[] = [];
  step = 1;

  constructor(
    private fixtureService: FixtureService,
    private stateService: StatePersistenceService
  ) {
    const saved = this.stateService.loadState();
    if (saved) {
      this.nameCompetetion = saved.nameCompetetion ?? '';
      this.numberOfTeams = saved.numberOfTeams ?? 4;
      this.useCustomNames = saved.useCustomNames ?? false;
      this.homeAndAway = saved.homeAndAway ?? false;
      this.step = saved.step ?? 1;
      this.teamNames = saved.teamNames ?? [];
      this.fixture = saved.fixture ?? [];
    }
  }

  private saveCurrentState() {
    this.stateService.saveState({
      nameCompetetion: this.nameCompetetion,
      numberOfTeams: this.numberOfTeams,
      useCustomNames: this.useCustomNames,
      homeAndAway: this.homeAndAway,
      teamNames: this.teamNames,
      fixture: this.fixture,
      step: this.step
    });
  }
  goToBackStep(){
    if(this.step > 1){
      this.step--;
      this.saveCurrentState();
    }
  }
  goToNextStep() {
    if(this.step === 1 && this.nameCompetetion.trim() === '') {
      alert('Por favor, completa el nombre de la competición.');
      return;
    }
    if (this.step === 2 && this.useCustomNames) {
      const filled = this.teamNames.filter(name => name.trim() !== '').length;
      if (filled < this.numberOfTeams) {
        alert('Por favor, completa todos los nombres de los equipos.');
        return;
      }
    }
    this.step++;
    this.saveCurrentState();
  }

  reset() {
    this.step = 1;
    this.nameCompetetion = '';
    this.numberOfTeams = 4;
    this.useCustomNames = false;
    this.homeAndAway = false;
    this.teamNames = [];
    this.fixture = [];
    this.saveCurrentState();
  }
  updateTeamNames(names: string[]) {
    this.teamNames = names;
  }

  generateFixture() {
    this.fixture = this.fixtureService.generateFixture(
      this.numberOfTeams,
      this.useCustomNames ? this.teamNames : undefined,
      this.homeAndAway
    );
    this.step = 4
    this.saveCurrentState();
  }
}
