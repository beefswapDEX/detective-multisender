import { 
  Component, 
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';
import { Web3Service } from 'src/app/shared/services/web3-service/web3.service';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  showNavOption: boolean = false;
  showNetworkOption: boolean = false;
  showModalConnectWallet: boolean = false;
  currentRoute: any = '';

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

  connectWalletOptions = [
    { 
      icon: 'assets/images/svg/metamask.svg',
      name: 'Metamask'
    }
  ]

  constructor(
    private router: Router,
    private web3Service: Web3Service
  ) { 
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.showAppBar);
  }

  ngDoCheck(): void {
    this.currentRoute = this.router.url
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

  toggleModalConnectWallet(): void {
    this.showModalConnectWallet = !this.showModalConnectWallet;
    if(this.showModalConnectWallet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }
  connectMetamask() {
    this.web3Service.connectAccount()
  }
}
