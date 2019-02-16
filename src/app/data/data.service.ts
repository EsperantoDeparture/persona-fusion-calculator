import { Injectable } from '@angular/core';
import {
  personae as personae3fes,
  arcana2Combos as arcana2Combos3fes,
  arcana3Combos as arcana3Combos3fes,
  specialCombos as specialCombos3fes
} from '../data/persona3-fes';
import {
  personae as personae3portable,
  arcana2Combos as arcana2Combos3portable,
  arcana3Combos as arcana3Combos3portable,
  specialCombos as specialCombos3portable
} from '../data/persona3-portable';
import {
  personae as personae4,
  arcana2Combos as arcana2Combos4,
  arcana3Combos as arcana3Combos4,
  specialCombos as specialCombos4
} from '../data/persona4';
import {
  personae as personae4golden,
  arcana2Combos as arcana2Combos4golden,
  arcana3Combos as arcana3Combos4golden,
  specialCombos as specialCombos4golden
} from '../data/persona4-golden';
import {
  personae as personae5,
  arcana2Combos as arcana2Combos5,
  arcana3Combos as arcana3Combos5,
  specialCombos as specialCombos5
} from '../data/persona5';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  releases = [
    'Persona3: FES',
    'Persona 3: Portable',
    'Persona 4',
    'Persona 4: Golden',
    'Persona 5'
  ];
  currentRelease: string;
  constructor(private storageService: StorageService, private router: Router) {
    this.currentRelease = this.currentRelease
      ? this.currentRelease
      : this.storageService.get('current_release');
  }

  selectRelease(release: string) {
    this.currentRelease = this.releases.find(r => r === release);
    this.storageService.save('current_release', this.currentRelease);
    this.router.navigate(['/personae']);
  }

  getPersonae() {
    switch (this.currentRelease) {
      case 'Persona3: FES':
        return personae3fes;
      case 'Persona 3: Portable':
        return personae3portable;
      case 'Persona 4':
        return personae4;
      case 'Persona 4: Golden':
        return personae4golden;
      case 'Persona 5':
        return personae5;
    }
  }

  getArcana2Combos() {
    switch (this.currentRelease) {
      case 'Persona3: FES':
        return arcana2Combos3fes;
      case 'Persona 3: Portable':
        return arcana2Combos3portable;
      case 'Persona 4':
        return arcana2Combos4;
      case 'Persona 4: Golden':
        return arcana2Combos4golden;
      case 'Persona 5':
        return arcana2Combos5;
    }
  }

  getArcana3Combos() {
    switch (this.currentRelease) {
      case 'Persona3: FES':
        return arcana3Combos3fes;
      case 'Persona 3: Portable':
        return arcana3Combos3portable;
      case 'Persona 4':
        return arcana3Combos4;
      case 'Persona 4: Golden':
        return arcana3Combos4golden;
      case 'Persona 5':
        return arcana3Combos5;
    }
  }

  getSpecialComos() {
    switch (this.currentRelease) {
      case 'Persona3: FES':
        return specialCombos3fes;
      case 'Persona 3: Portable':
        return specialCombos3portable;
      case 'Persona 4':
        return specialCombos4;
      case 'Persona 4: Golden':
        return specialCombos4golden;
      case 'Persona 5':
        return specialCombos5;
    }
  }
}
