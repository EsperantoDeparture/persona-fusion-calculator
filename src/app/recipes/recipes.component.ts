import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../models/persona.model';
import { Recipe } from '../models/recipe.model';
import { Combo } from '../models/combo.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataService } from '../data/data.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          height: '0px',
          display: 'none'
        })
      ),
      transition('void <=> *', animate(500))
    ])
  ]
})
export class RecipesComponent implements OnInit {
  persona: Persona;
  personae: Persona[] = this.dataService.getPersonae();
  personaeByName = this.personae.map(persona => {
    const obj = {};
    obj[`${persona.name}`] = persona;
    return obj;
  });
  personaeByArcana: { [key: string]: Persona[] } = {};
  arcanaRank: any = {};
  recipes: Recipe[] = [];
  maxCost = 0;
  arcana2Combos: Combo[] = this.dataService.getArcana2Combos();
  arcana3Combos: Combo[] = this.dataService.getArcana3Combos();
  specialCombos: Combo[] = this.dataService.getSpecialCombos();

  displayedColumns = ['cost', 'personae'];

  dataSource: MatTableDataSource<Recipe>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService) {
    this.recipes = [];
    for (const persona of this.personae) {
      if (!this.personaeByArcana[persona.arcana]) {
        this.personaeByArcana[persona.arcana] = [];
      }
      this.personaeByArcana[persona.arcana].push(persona);
    }
    let rank = 0;
    let lastArcana = '';
    for (const persona of this.personae) {
      if (persona.arcana === lastArcana) {
        continue;
      }
      lastArcana = persona.arcana;
      this.arcanaRank[persona.arcana] = rank++;
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.persona = this.personae.find(
        persona => persona.name === params['persona']
      );
      this.recipes = [];
      this.getRecipes();
      this.recipes = this.recipes.sort((a: Recipe, b: Recipe) => {
        if (a.cost < b.cost) {
          return -1;
        }
        if (a.cost > b.cost) {
          return 1;
        }
        return 0;
      });
      this.dataSource = new MatTableDataSource<Recipe>(this.recipes);
      this.dataSource.paginator = this.paginator;
    });
  }

  getRecipes() {
    // Special combos
    if (this.persona.special) {
      for (const specialCombo of this.specialCombos) {
        if (this.persona.name === specialCombo.result) {
          const recipe = new Recipe();
          recipe.personae = specialCombo.source.map(persona =>
            this.personae.find(p => p.name === persona)
          );
          this.recipes.push(recipe);
        }
      }
    }

    // Straight fusion
    const straightFusionRecipes: Recipe[] = this.getArcanaRecipes(
      this.persona.arcana,
      this.filter2Way
    );
    for (const recipe of straightFusionRecipes) {
      this.addRecipe(recipe);
    }

    // Triangle fusion
    const combos = this.arcana3Combos.filter(
      combo => combo.result === this.persona.arcana
    );
    for (const combo of combos) {
      // For every possible 3-way fusion, consider all recipes to produce
      // arcana A, plus an arcana B if it's higher, plus vice versa.
      this.find3WayRecipes(combo.source[0], combo.source[1]);
      if (combo.source[1] !== combo.source[0]) {
        this.find3WayRecipes(combo.source[1], combo.source[0]);
      }
    }
  }

  persona3IsValid(persona1: Persona, persona2: Persona, persona3: Persona) {
    if (persona3.name === persona1.name) {
      return false;
    }
    if (persona3.name === persona2.name) {
      return false;
    }

    if (persona3.level < persona1.level) {
      return false;
    }
    if (persona3.level < persona2.level) {
      return false;
    }

    if (persona3.level === persona1.level) {
      return (
        this.arcanaRank[persona3.arcana] < this.arcanaRank[persona1.arcana]
      );
    }
    if (persona3.level === persona2.level) {
      return (
        this.arcanaRank[persona3.arcana] < this.arcanaRank[persona2.arcana]
      );
    }

    return true;
  }

  filter2Way(persona1: Persona, persona2: Persona, result: Persona) {
    if (persona1.name === this.persona.name) {
      return true;
    }
    if (persona2.name === this.persona.name) {
      return true;
    }
    if (result.name === this.persona.name) {
      return false;
    }
    return true;
  }

  getArcanaRecipes(
    arcanaName: string,
    filter?: (persona1: Persona, persona2: Persona, result: Persona) => boolean
  ) {
    const recipes: Recipe[] = [];
    const combos: Combo[] = this.arcana2Combos.filter(
      combo => combo.result === arcanaName
    );
    for (const combo of combos) {
      const personae1 = this.personaeByArcana[combo.source[0]];
      const personae2 = this.personaeByArcana[combo.source[1]];
      let j = 0;
      for (const persona1 of personae1) {
        let k = 0;
        for (const persona2 of personae2) {
          if (persona1.arcana === persona2.arcana && k <= j) {
            k++;
            continue;
          }
          const result = this.fuse2(combo.result, persona1, persona2);
          if (!result) {
            k++;
            continue;
          }
          if (filter && filter.call(this, persona1, persona2, result)) {
            k++;
            continue;
          }
          const recipe = new Recipe();
          recipe.cost = 0;
          recipe.personae = [persona1, persona2];
          recipes.push(recipe);
          k++;
        }
        j++;
      }
    }
    return recipes;
  }

  addRecipe(recipe: Recipe) {
    recipe.cost = 0;
    for (const persona of recipe.personae) {
      recipe.cost +=
        27 * persona.level * persona.level + 126 * persona.level + 2147;
    }
    recipe.personae = recipe.personae.sort((a: Persona, b: Persona) => {
      if (a.level > b.level) {
        return -1;
      }
      if (a.level < b.level) {
        return 1;
      }
      return this.arcanaRank[a.arcana] > this.arcanaRank[b.arcana] ? -1 : 1;
    });
    this.recipes.push(recipe);
  }

  fuse2(arcana: string, persona1: Persona, persona2: Persona) {
    const level = 1 + Math.floor((persona1.level + persona2.level) / 2);
    let i = 0;
    for (const persona of this.personaeByArcana[arcana]) {
      if (persona.level >= level) {
        if (persona.special) {
          continue;
        }
        break;
      }
      i++;
    }

    if (persona1.arcana === persona2.arcana) {
      i--;
    }

    if (
      this.personaeByArcana[arcana][i] === persona1 ||
      this.personaeByArcana[arcana][i] === persona2
    ) {
      i--;
    }
    return this.personaeByArcana[arcana][i];
  }

  fuse3(
    arcana: string,
    persona1: Persona,
    persona2: Persona,
    persona3: Persona
  ) {
    const level =
      5 + Math.floor((persona1.level + persona2.level + persona3.level) / 3);
    let found = false;
    let i = 0;
    for (const persona of this.personaeByArcana[arcana]) {
      if (persona.level >= level) {
        if (persona.special) {
          continue;
        }
        found = true;
        break;
      }
      i++;
    }

    if (!found) {
      return null;
    }

    // In same arcana fusion, skip over the ingredients.
    if (
      persona1.arcana === arcana &&
      persona2.arcana === arcana &&
      persona3.arcana === arcana
    ) {
      while (
        persona1.name === this.personaeByArcana[arcana][i].name ||
        persona2.name === this.personaeByArcana[arcana][i].name ||
        persona3.name === this.personaeByArcana[arcana][i].name
      ) {
        i++;
        if (i > this.personaeByArcana[arcana].length - 1) {
          return null;
        }
      }
    }

    return this.personaeByArcana[arcana][i];
  }

  find3WayRecipes(arcana1: string, arcana2: string) {
    const step1Recipes: Recipe[] = this.getArcanaRecipes(arcana1);
    for (const step1Recipe of step1Recipes) {
      const persona1 = step1Recipe.personae[0];
      const persona2 = step1Recipe.personae[1];
      for (const persona3 of this.personaeByArcana[arcana2]) {
        if (this.persona3IsValid(persona1, persona2, persona3)) {
          const result = this.fuse3(
            this.persona.arcana,
            persona1,
            persona2,
            persona3
          );
          if (!result || result.name !== this.persona.name) {
            continue;
          }
          const recipe = new Recipe();
          recipe.personae = [
            step1Recipe.personae[0],
            step1Recipe.personae[1],
            persona3
          ];
          recipe.cost = 0;
          this.addRecipe(recipe);
        }
      }
    }
  }

  go(persona: string) {
    this.router.navigate(['/recipes'], {
      queryParams: {
        persona: persona
      }
    });
  }
}
