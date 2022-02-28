import { 
  Component, 
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  showNavOption: boolean = false;
  showNetworkOption: boolean = false;

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
  ];

  networkOptions = [
    {
      icon: 'assets/images/networks/eth.svg',
      name: 'Ethereum Mainnet'
    },
    {
      icon: 'assets/images/networks/bsc.svg',
      name: 'BSC Mainnet'
    },
    {
      icon: 'assets/images/networks/polygon.svg',
      name: 'Polygon Mainnet'
    },
    {
      icon: 'assets/images/networks/solana.svg',
      name: 'Solana Mainnet'
    },
    {
      icon: 'assets/images/networks/arbitrum.svg',
      name: 'Arbitrum Mainnet'
    },
    {
      icon: 'assets/images/networks/optimism.svg',
      name: 'Optimism Mainnet'
    },
    {
      icon: 'assets/images/networks/avalance.svg',
      name: 'Avalanche Mainnet'
    },
    {
      icon: 'assets/images/networks/fantom.svg',
      name: 'Fantom Mainnet'
    },
    {
      icon: 'assets/images/networks/okex.svg',
      name: 'Okex Chain Mainnet'
    }
  ]

  constructor() { 
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.showAppBar);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.showAppBar);
  }

  showAppBar(): void {
    if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      document.querySelector('app-bar')?.classList.add('bg-multisender-blue-dark', 'shadow-md');
    } else {
      document.querySelector('app-bar')?.classList.remove('bg-multisender-blue-dark', 'shadow-md');
    }
  }

  toggleNavOption(): void {
    this.showNavOption = !this.showNavOption;
  }

  toggleNetworkOption(): void {
    this.showNetworkOption = !this.showNetworkOption;
  }
}
