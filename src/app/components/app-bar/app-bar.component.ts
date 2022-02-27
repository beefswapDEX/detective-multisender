import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  showNavOption: boolean = false;

  navItem = [
    {
      name: 'Token MultiSender',
      icon: 'assets/images/svg/dice.svg',
      path: 'token'
    },
    {
      name: 'NFT MultiSender',
      icon: 'assets/images/svg/box.svg',
      path: 'nft'
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  toggleNavOption(): void {
    this.showNavOption = !this.showNavOption
  }
}
