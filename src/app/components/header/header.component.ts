import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  networkListData = [
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
  selectedOption: string = "token";
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  public navigateTo(event: any) {
    if (event) {
      this.router.navigate([event]);
    }
    return false;
  }

}
