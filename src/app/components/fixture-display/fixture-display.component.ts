import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { StatePersistenceService } from '../../services/state-persistence.service';

@Component({
  selector: 'app-fixture-display',
  standalone: true,
  imports: [],
  templateUrl: './fixture-display.component.html',
  styleUrl: './fixture-display.component.css'
})
export class FixtureDisplayComponent {

  nameCompetetion!: string;
  @Input() fixture: { matchday: number, matches: string[] }[] = [];
  @Output() resetClicked = new EventEmitter<void>();
  @Output() backClicked = new EventEmitter<void>();

  constructor(
    private PDFGenerator: PdfGeneratorService,
    private stateService: StatePersistenceService
  ) { 
    const saved = this.stateService.loadState();
    if (saved) {
      this.nameCompetetion = saved.nameCompetetion ?? '';
    }
  }

  donloadPDF() {
    this.PDFGenerator.generateFixturePDF(this.fixture);
  }
  onBackStep() {
    this.backClicked.emit();
  }
  onReset() {
    const confirmed = confirm("¿Estás seguro de que quieres reiniciar el fixture? Se perderán todos los datos actuales.");
    if (confirmed) {
      this.resetClicked.emit();
    }
  }
  
}
