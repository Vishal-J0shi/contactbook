import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cus-dashboard',
  templateUrl: './cus-dashboard.component.html',
  styleUrls: ['./cus-dashboard.component.css']
})
export class CusDashboardComponent implements OnInit {
  name = '';
  access = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.name = JSON.parse(localStorage.getItem('currentUser')).name;
    this.access = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
  }
  logout() {
    localStorage.setItem('currentUser', null);
    this.router.navigate(['/login']);

  }
}
