import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconRegistry,
  MatToolbarModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatListModule,
  MatCardModule
} from '@angular/material';
import { RecipesComponent } from './recipes/recipes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VersionSelectorComponent } from './version-selector/version-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    RecipesComponent,
    VersionSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    HttpClientModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatDividerModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/home.svg')
    );
    iconRegistry.addSvgIcon(
      'navigate_before',
      sanitizer.bypassSecurityTrustResourceUrl('assets/navigate_before.svg')
    );
    iconRegistry.addSvgIcon(
      'navigate_next',
      sanitizer.bypassSecurityTrustResourceUrl('assets/navigate_next.svg')
    );
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('assets/close.svg')
    );
  }
}
