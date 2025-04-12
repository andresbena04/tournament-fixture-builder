import { Component } from '@angular/core';
import { FixtureGeneratorComponent } from './components/fixture-generator/fixture-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FixtureGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MatchMaker';
}
