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

constructor(
  private PDFGenerator:PdfGeneratorService
){}
  ngOnInit() {
    console.log(this.fixture)
    
  }

  donloadPDF(){
    this.PDFGenerator.generateFixturePDF(this.fixture);
  }
  onReset() {
    this.resetClicked.emit(); 
  }
}
