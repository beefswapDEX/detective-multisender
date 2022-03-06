import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AbiItem } from 'web3-utils'
import erc20Abi from 'src/app/config/abi/erc20.json';
import detectiveMultisenderAbi from 'src/app/config/abi/detectiveMultisender.json';
import keys from 'src/app/config/constants/keys';
import { selectFeatureAddress, selectFeatureChain } from 'src/app/store/web3store/web3.reducer';
import { BIG_ZERO } from 'src/app/utils/bigNumber';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import BN from 'bignumber.js';
import contract from 'src/app/config/constants/contracts';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private web3: Web3;
  httpOptions: any;
  chainId: number;
  account: string;
  decimals: any;
  allowance: any;
  currentFee: string;
  arrayLimit: number;
  tokenAddress: any;
  tokenSymbol: string;
  ethBalance: any;
  defAccTokenBalance: any;
  addressValidData = [];

  constructor(
    private readonly localStorage: LocalStorageService,
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
    this.addressStore.pipe(select(selectFeatureAddress)).subscribe((val) => {
      this.account = val
    })
    this.addressStore.pipe(select(selectFeatureChain)).subscribe((val) => {
      this.chainId = this.web3.utils.hexToNumber(val)
    })
  }

  getUserTokens() {
		return this.httpClient.get(`${environment.covalenthq_gateway}/${this.chainId}/address/${this.account}/balances_v2/?format=JSON&nft=false&no-nft-fetch=true&key=${environment.covalenthq_apikey}`).subscribe((value: any) => {
      let res = value.data.items.map((data: any) => {
        const {contract_address, contract_ticker_symbol, balance} = data;
        return {
          label: `${contract_ticker_symbol} - ${contract_address}`,
          value: `${contract_address}`,
          balance: `${this.web3.utils.fromWei(balance)}`
        }
      })
      this.localStorage.setItem(keys.web3service.user_tokens, res)
    }, (error: any) => {
      window.alert(error.error.error_message)
    });
	}

  async getDecimals(tokenAddress: string): Promise<any> {
    try{ 
      const contractDecimal = new this.web3.eth.Contract(erc20Abi as AbiItem[], tokenAddress);
      this.decimals = await contractDecimal.methods.decimals().call();
      return this.decimals
    } catch(e) {
      window.alert('Cannot get decimals for token contract.\n Please make sure you are on the right network and token address exists')
      console.error('Get Decimals', e)
    }
  }

  async getBalance(): Promise<any> {
    try {
      const contractBalance = new this.web3.eth.Contract(erc20Abi as AbiItem[], this.tokenAddress);
      const balance = await contractBalance.methods.balanceOf(this.account).call();
      this.decimals = await contractBalance.methods.decimals().call();
      return balance / Math.pow(10, this.decimals);
    } catch (error: any) {
      console.log('getBalance', error)
      return BIG_ZERO;
    }
  }

  async getEthBalance(): Promise<any> {
    try {
      let ethBalance =  await this.web3.eth.getBalance(this.account)
      ethBalance = this.web3.utils.fromWei(ethBalance)
      ethBalance = new BN(ethBalance).toFormat(3)
      return ethBalance
    }
    catch(e){
      console.error('getEthBalance ',e)
    }
  }

  async getTokenSymbol(tokenAddress: string): Promise<any>{
    try {
      const token = new this.web3.eth.Contract(erc20Abi as AbiItem[], tokenAddress);
      this.tokenSymbol = await token.methods.symbol().call();
      return this.tokenSymbol;
    }
    catch(e: any){
      window.alert('Token with this Address doesnt exist.\n Please make sure you are on the right network and token address exists')
      console.error(e)
    }
  }

  get multiplier(){
    const decimals = Number(this.decimals)
    return new BN(10).pow(decimals)
  }

  async getAllowance(tokenAddress: string): Promise<any> {
    try {
      const token = new this.web3.eth.Contract(erc20Abi as AbiItem[], tokenAddress);
      const allowance = await token.methods.allowance(this.account, contract.externalStorageProxyForDetectiveMultisender[this.chainId]).call();
      this.allowance = new BN(allowance).div(this.multiplier).toString(10)
      return this.allowance
    }
    catch(e){
      window.alert(`Token address doesn't have allowance method.\n Please make sure you are on the right network and token address exists.\n
         Your account: ${this.account}`)
      console.error('GetAllowance',e)
    }
  }

  async getCurrentFee(): Promise<any> {
    try {
      const multisender = new this.web3.eth.Contract(detectiveMultisenderAbi as AbiItem[], contract.externalStorageProxyForDetectiveMultisender[this.chainId]);
      const currentFee = await multisender.methods.currentFee(this.account).call();
      this.currentFee = this.web3.utils.fromWei(currentFee)
      return this.currentFee
    }
    catch(e){
      console.error('getCurrentFee ',e)
    }
  }

  async getArrayLimit(): Promise<any> {
    try {
      const multisender = new this.web3.eth.Contract(detectiveMultisenderAbi as AbiItem[], contract.detectiveMultisender[this.chainId]);
      this.arrayLimit = await multisender.methods.arrayLimit().call();
      return this.arrayLimit
    }
    catch(e){
      console.error('GetArrayLimit ', e)
    }
  }

  async setTokenAddress(tokenAddress: string): Promise<any> {
    if(this.web3.utils.isAddress(this.account) && tokenAddress !== "0x000000000000000000000000000000000000bEEF"){
      this.tokenAddress = tokenAddress;
      await this.getDecimals(tokenAddress)
      await this.getBalance()
      await this.getAllowance(tokenAddress)
      await this.getCurrentFee()
      this.getTokenSymbol(tokenAddress)
      this.getEthBalance()
      this.getArrayLimit()
    } else {
      this.tokenAddress = tokenAddress;
      await this.getCurrentFee()
      await this.getEthBalance()
      this.getArrayLimit()
      this.decimals = 18;
      this.defAccTokenBalance = this.ethBalance;
    }
  }

  public get totalNumberTx() {
    return Math.ceil(this.addressValidData.length/this.arrayLimit);
  }

  public get totalCostInEth(){
    const standardGasPrice = this.web3.utils.toWei('23.0', 'gwei');
    const currentFeeInWei = this.web3.utils.toWei('22');
    const tx = new BN(standardGasPrice).times(new BN('5000000'))
    const txFeeMiners = tx.times(new BN(this.totalNumberTx))
    const contractFee = new BN(currentFeeInWei).times(this.totalNumberTx);
    return this.web3.utils.fromWei(txFeeMiners.plus(contractFee).toString(10))
  }
}
