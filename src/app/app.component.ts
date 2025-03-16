// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <h1>Heroes</h1>
    <ul>
      <li *ngFor="let hero of heroes">{{ hero.name }}</li>
    </ul>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  heroes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/api/heroes').subscribe((data) => {
      // URL RELATIVA
      console.log('Data from API:', data);
      this.heroes = data;
    });
  }
}
