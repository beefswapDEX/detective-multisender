export const CHAIN_ID = 97
interface networkList {
  [networkName: string]: any
}
export const ETH_MAINNET =  {
  method: "wallet_switchEthereumChain",
  params: [{ chainId: "0x1" }],
}
export enum SupportedChainId {
  ETHEREUM_MAINNET= "0x1",
  BSC_MAINNET = "0x38",
  BSC_TESTNET = "0x61",
  POLYGON_MAINNET = "0x89",
  FANTOM_MAINNET = "0xfa",
  SOLANA_MAINNET = "solana",
  ARBITRUM_MAINNET = "arbitrum",
  OPTIMISM_MAINNET = "optimism",
  AVALANCHE_MAINNET = "0xa86a",
  OKEX_MAINNET = "0x42",
  HECO_MAINNET = "0x80"
}
export const NETWORK_INFO = {
  [SupportedChainId.BSC_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x38",
        chainName: "BSC Mainnet",
        nativeCurrency: {
          name: "Binance Coin",
          symbol: "BNB",
          decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed1.defibit.io"],
        blockExplorerUrls: [`https://bscscan.com/`],
      },
    ],
  },
  [SupportedChainId.POLYGON_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x89",
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "Polygon",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
        blockExplorerUrls: [`https://polygonscan.com/`],
      },
    ],
  },
  [SupportedChainId.FANTOM_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0xfa",
        chainName: "Fantom Opera",
        nativeCurrency: {
          name: "Fantom",
          symbol: "FTM",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.ftm.tools/"],
        blockExplorerUrls: [`https://ftmscan.com/`],
      },
    ],
  },
  [SupportedChainId.SOLANA_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x89",
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "Polygon",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
        blockExplorerUrls: [`https://polygonscan.com/`],
      },
    ],
  },
  [SupportedChainId.AVALANCHE_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0xa86a",
        chainName: "Avalanche C-Chain",
        nativeCurrency: {
          name: "Avalanache",
          symbol: "AVAX",
          decimals: 18,
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: [`https://cchain.explorer.avax.network/`],
      },
    ],
  },
  [SupportedChainId.OKEX_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x42",
        chainName: "OKExChain Mainnet",
        nativeCurrency: {
          name: "OKT",
          symbol: "OKT",
          decimals: 18,
        },
        rpcUrls: ["https://exchainrpc.okex.org"],
        blockExplorerUrls: [`https://www.oklink.com/okexchain/`],
      },
    ],
  },
  [SupportedChainId.HECO_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [{
      chainId: "0x80",
      chainName: "HECO MAINNET",
      nativeCurrency: {
        name: "HECO",
        symbol: "HT",
        decimals: 18,
      },
      rpcUrls: ["https://http-mainnet-node.huobichain.com"],
      blockExplorerUrls: ["https://hecoinfo.com"],
    }],
  },
}