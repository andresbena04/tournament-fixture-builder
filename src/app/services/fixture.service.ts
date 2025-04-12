import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {


  generateFixture(
    numberOfTeams: number,            
    customTeamNames?: string[],        
    homeAndAway: boolean = false       
  ): { matchday: number; matches: string[] }[] {

    let teams = customTeamNames?.length === numberOfTeams
      ? [...customTeamNames]
      : Array.from({ length: numberOfTeams }, (_, i) => `Team ${i + 1}`);

    const isOdd = teams.length % 2 !== 0;
    if (isOdd) teams.push('BYE');

    const totalRounds = teams.length - 1;   
    const half = teams.length / 2;          
    const fixture: { matchday: number; matches: string[] }[] = [];  

    const teamList = [...teams];           
    const fixedTeam = teamList[0];         
    const rotatingTeams = teamList.slice(1); 

    for (let round = 0; round < totalRounds; round++) {
      const roundTeams = [fixedTeam, ...rotatingTeams]; 
      const matches: string[] = [];                     


      for (let i = 0; i < half; i++) {
        let home: string;
        let away: string;

        if (i === 0) {
          // El equipo fijo cambia localía en jornadas alternadas
          if (round % 2 === 0) {
            home = roundTeams[0];
            away = roundTeams[roundTeams.length - 1];
          } else {
            home = roundTeams[roundTeams.length - 1];
            away = roundTeams[0];
          }
        } else {
          // Emparejamiento normal
          home = roundTeams[i];
          away = roundTeams[roundTeams.length - 1 - i];
        }

        // Se ignoran partidos con "BYE"
        if (home !== 'BYE' && away !== 'BYE') {
          matches.push(`${home} vs ${away}`);
        }
      }

      // Se añade la jornada al fixture
      fixture.push({ matchday: round + 1, matches });

      // Rotación circular: el último equipo pasa al principio (excepto el fijo)
      rotatingTeams.unshift(rotatingTeams.pop()!);
    }

    // Si se desea ida y vuelta (segunda vuelta con localías invertidas)
    if (homeAndAway) {
      const secondLegs = fixture.map((round, index) => ({
        matchday: totalRounds + index + 1,
        matches: round.matches.map(match => {
          const [home, away] = match.split(' vs ') 
          return `${away} vs ${home}`; 
        })
      }));
      fixture.push(...secondLegs); 
    }

    return fixture; 
  }
}
