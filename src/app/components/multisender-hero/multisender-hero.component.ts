import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multisender-hero',
  templateUrl: './multisender-hero.component.html',
  styleUrls: ['./multisender-hero.component.scss']
})

export class MultisenderHeroComponent implements OnInit {
  networks = [
    {
      name: "ETH Mainnet",
      imagePath: "assets/images/networks/eth.svg"
    },
    {
      name: "BSC Mainnet",
      imagePath: "assets/images/networks/bsc.svg"
    },
    {
      name: "Polygon Mainnet",
      imagePath: "assets/images/networks/polygon.svg"
    },
    {
      name: "Fantom Mainnet",
      imagePath: "assets/images/networks/fantom.svg"
    },
    {
      name: "Solana Mainnet",
      imagePath: "assets/images/networks/solana.svg"
    },
    {
      name: "Avalance Mainnet",
      imagePath: "assets/images/networks/avalance.svg"
    },
    {
      name: "Polkadot Mainnet",
      imagePath: "assets/images/networks/polkadot.svg"
    },
    {
      name: "Okex Mainnet",
      imagePath: "assets/images/networks/okex.svg"
    },
    {
      name: "Huobi Mainnet",
      imagePath: "assets/images/networks/huobi.svg"
    },
  ]
  currentRoute: any = '';

  constructor(private readonly router: Router) { }
  ngDoCheck(): void {
    this.currentRoute = this.router.url
  }
  ngOnInit(): void { }
}
