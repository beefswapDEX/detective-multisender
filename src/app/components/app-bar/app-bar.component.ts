import { 
  Component, 
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';
import { NetworkOptionModel, networkOptions } from 'src/app/config/constants/networks';
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
  address: string | undefined;
  chainId: string | undefined;

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

  networkOptions: NetworkOptionModel[] = networkOptions

  connectWalletOptions = [
    { 
      icon: 'assets/images/svg/metamask.svg',
      name: 'Metamask'
    }
  ]
  selectedNetwork: NetworkOptionModel[] = [];

  constructor(
    private router: Router,
    private web3Service: Web3Service,
  ) {
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.showAppBar);
    this.web3Service.address$?.subscribe((val: any) => {
      this.address = val;
    })
    this.web3Service.chainId$?.subscribe((val: any) => {
      this.filteringNetwork(val)
      this.chainId = val
    })
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

  filteringNetwork(chainId: string) {
    this.selectedNetwork = this.networkOptions.filter((network) => {
      return network.chainId === chainId;
    });
  }

  changeNetwork(chainId: any) {
    this.web3Service.changeNetwork(chainId)
  }
}
