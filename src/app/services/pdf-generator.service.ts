import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { StatePersistenceService } from './state-persistence.service';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor(private stateService: StatePersistenceService) {}
  generateFixturePDF(fixture: { matchday: number; matches: string[] }[]): void {
    const doc = new jsPDF();

    const state = this.stateService.loadState();
    const competitionName = state?.nameCompetetion || 'Competición';
    
    fixture.forEach((day, index) => {
      if (index !== 0) doc.addPage();

      // Título de la jornada
      doc.setFontSize(18);
      doc.text(`${competitionName} - Jornada ${day.matchday}`, 14, 20);

      // Tabla con los partidos
      autoTable(doc, {
        startY: 30,
        head: [['Partidos']],
        body: day.matches.map((match) => [match]),
        styles: {
          fontSize: 12,
          halign: 'center',
        },
        headStyles: {
          fillColor: [52, 152, 219], // Azul bonito
          textColor: 255,
        },
        margin: { top: 30 },
      });
    });

    doc.save('fixture.pdf');
  }
}
