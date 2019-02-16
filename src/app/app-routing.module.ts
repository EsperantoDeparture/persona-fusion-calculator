import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { VersionSelectorComponent } from './version-selector/version-selector.component';

const routes: Routes = [
  { path: '', component: VersionSelectorComponent },
  { path: 'personae', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
