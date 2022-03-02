import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Web3 from "web3";
import { AbiItem, Unit } from 'web3-utils'
import keys from 'src/app/config/constants/keys';
import erc20Abi from 'src/app/config/abi/erc20.json';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { environment } from 'src/environments/environment';
import { UserTokenModel } from 'src/app/config/models/user-token.model';
import { BIG_ZERO } from 'src/app/utils/bigNumber';
import { SupportedChainId } from 'src/app/config/constants/networks'
import { hexStripZeros } from "@ethersproject/bytes";
import { BigNumber } from "@ethersproject/bignumber";
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: Web3;
  httpOptions: any;

  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly httpClient: HttpClient
    ) {
    this.web3 = new Web3(window.ethereum)
    this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
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
        this.localStorage.removeItem(keys.web3service.address)
        this.localStorage.removeItem(keys.web3service.user_tokens)
        console.log("User disconnect wallet");
      } else {
        this.localStorage.setItem(keys.web3service.address, accounts.result[0]);
        const chainId = await this.getCurrentNetwork()
        this.getUserTokens(chainId)
      }
    })
  }

  detectNetworkChange() {
    window.ethereum.on("networkChanged", (chainId: number) => {
      const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());
      const values = Object.values(SupportedChainId);
      if (!values.includes(formattedChainId as unknown as SupportedChainId)) {
        console.log(formattedChainId, 'is not supported');
        this.localStorage.removeItem(keys.web3service.user_tokens)
      } else {
        this.getUserTokens(chainId);
        console.log(formattedChainId);
      }
    })
  }
  
  private async enableMetaMaskAccount(): Promise<any> {
    await window.ethereum.send('eth_requestAccounts')
      .then(async (accounts: any) => {
        this.localStorage.setItem(keys.web3service.address, accounts.result[0]);
        const chainId = await this.getCurrentNetwork()
        this.getUserTokens(chainId)
      })
      .catch((e: any) => {
        console.log(e);
        if (e.code === 4001) {
          window.alert(e.message);
        }
      })
  }

  getUserTokens(chainId: number) {
    const account = this.localStorage.getItem(keys.web3service.address)
		return this.httpClient.get(`${environment.covalenthq_gateway}/${chainId}/address/${account}/balances_v2/?format=JSON&nft=false&no-nft-fetch=true&key=${environment.covalenthq_apikey}`).subscribe((value: any) => {
      let res = value.data.items.map((data: any) => {
        const {contract_address, contract_ticker_symbol, balance} = data;
        return {
          label: `${contract_ticker_symbol} - ${contract_address}`,
          value: `${contract_address}`,
          balance: `${this.web3.utils.fromWei(balance)}`
        }
      })
      this.localStorage.setItem(keys.web3service.user_tokens, res)
    });
	}

  async getBalance(tokenAddress: string, account: string): Promise<any> {
    try {
      const contract = new this.web3.eth.Contract(erc20Abi as AbiItem[], tokenAddress);
      const balance = await contract.methods.balanceOf(account).call();
      const decimals = await contract.methods.decimals().call();
      const formattedBalance = balance / Math.pow(10, decimals);
      console.log(formattedBalance);
      return formattedBalance;
    } catch (error) {
      console.log('getBalance', error)
      return BIG_ZERO;
    }
  }

  async getCurrentNetwork(): Promise<any> {
   return this.web3.eth.getChainId()
  }

  // wip
  async changeNetwork(chainId:any): Promise<any> {
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }], // chainId must be in hexadecimal numbers
        });
      } catch (error) {
        // if network is not been added to metamask, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x61',
                  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                },
              ],
            });
          } catch (addError) {
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

}
