import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Web3 from "web3";
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { NETWORK_CONFIG, SupportedChainId } from 'src/app/config/constants/networks'
import { hexStripZeros } from "@ethersproject/bytes";
import { BigNumber } from "@ethersproject/bignumber";
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { clearAddress, clearChain, setAddress, setChain } from 'src/app/store/web3store/web3.actions';
import { selectFeatureAddress, selectFeatureChain } from 'src/app/store/web3store/web3.reducer';
import { TokenService } from '../token-service/token.service';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: Web3;
  httpOptions: any;
  chainId$: Observable<string> | undefined;
  address$: Observable<string> | undefined;

  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly tokenService: TokenService,
    private readonly httpClient: HttpClient,
    private addressStore: Store<{address: string}>,
    private chainStore: Store<{chainId: string}>
    ) {
    this.web3 = new Web3(window.ethereum)
    this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
    this.address$ = this.addressStore.pipe(select(selectFeatureAddress))
    this.chainId$ = this.chainStore.pipe(select(selectFeatureChain))
  }

  async connectAccount(): Promise<any> {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await this.enableMetaMaskAccount();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      await this.enableMetaMaskAccount();
    } else {
      window.alert('Non-Ethereum browser detected. You Should consider using MetaMask!');
    }
  }

  async detectAccountChange(): Promise<any> {
    window.ethereum.on("accountsChanged", async (accounts: any) => {
      if (!accounts.length) {
        this.addressStore.dispatch(clearAddress())
        this.chainStore.dispatch(clearChain())
        console.log("User disconnect wallet");
      } else {
        this.addressStore.dispatch(setAddress({address: accounts.result[0] }))
        const chainId = await this.getCurrentNetwork()
        this.chainStore.dispatch(setChain({chainId: hexStripZeros( BigNumber.from(chainId).toHexString() ) }))
        this.tokenService.getUserTokens()
      }
    })
  }

  detectNetworkChange() {
    window.ethereum.on("networkChanged", (chainId: number) => {
      const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());
      const values = Object.values(SupportedChainId);
      if (!values.includes(formattedChainId as unknown as SupportedChainId)) {
        console.log(formattedChainId, 'is not supported');
        this.chainStore.dispatch(clearChain())
      } else {
        this.chainStore.dispatch(setChain({chainId: formattedChainId}))
        this.tokenService.getUserTokens();
      }
    })
  }
  
  private async enableMetaMaskAccount(): Promise<any> {
    await window.ethereum.send('eth_requestAccounts')
      .then(async (accounts: any) => {
        this.addressStore.dispatch(setAddress({address: accounts.result[0] }))
        const chainId = await this.getCurrentNetwork()
        this.chainStore.dispatch(setChain({chainId: hexStripZeros( BigNumber.from(chainId).toHexString() ) }))
        this.tokenService.getUserTokens()
      })
      .catch((e: any) => {
        console.log(e);
        if (e.code === 4001) {
          window.alert(e.message);
        }
      })
  }

  async getCurrentNetwork(): Promise<any> {
   return this.web3.eth.getChainId()
  }

  async changeNetwork(chainId:any): Promise<any> {
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }], // chainId must be in hexadecimal numbers
        });
      } catch (error: any) {
        // if network is not been added to metamask, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request(NETWORK_CONFIG[chainId]);
          } catch (addError: any) {
            console.error(addError);
          }
        }
        console.error(error);
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  }

  validateAddress(address: string): boolean {
    return Web3.utils.isAddress(address)
  }

}
