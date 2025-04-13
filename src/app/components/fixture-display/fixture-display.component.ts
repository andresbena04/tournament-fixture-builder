import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@Component({
  selector: 'app-fixture-display',
  standalone: true,
  imports: [],
  templateUrl: './fixture-display.component.html',
  styleUrl: './fixture-display.component.css'
})
export class FixtureDisplayComponent {

  @Input() fixture: { matchday: number, matches: string[] }[] = [];
  @Output() resetClicked = new EventEmitter<void>();
  @Output() backClicked = new EventEmitter<void>();

  constructor(
    private PDFGenerator: PdfGeneratorService
  ) { }

  donloadPDF() {
    this.PDFGenerator.generateFixturePDF(this.fixture);
  }
  onBackStep() {
    this.backClicked.emit();
  }
  onReset() {
    this.resetClicked.emit();
  }
}
