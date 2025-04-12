// src/app/services/state-persistence.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatePersistenceService {
  private readonly STORAGE_KEY = 'fixtureConfig';

  saveState(state: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  loadState(): any | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  clearState(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
