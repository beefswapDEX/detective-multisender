export const CHAIN_ID = 97
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
  SOLANA_MAINNET = "0xe9ac0ce",
  ARBITRUM_MAINNET = "0xa4b1",
  OPTIMISM_MAINNET = "0xa",
  AVALANCHE_MAINNET = "0xa86a",
  OKEX_MAINNET = "0x42",
  HECO_MAINNET = "0x80"
}
export const NETWORK_CONFIG = {
  [SupportedChainId.BSC_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: SupportedChainId.BSC_MAINNET,
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
        chainId: SupportedChainId.POLYGON_MAINNET,
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
        chainId: SupportedChainId.FANTOM_MAINNET,
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
  // TODO: Confirm the config
  [SupportedChainId.SOLANA_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: SupportedChainId.SOLANA_MAINNET,
        chainName: "Neon EVM DevNet",
        nativeCurrency: {
          name: "Neon",
          symbol: "NEON",
          decimals: 18,
        },
        rpcUrls: ["https://proxy.devnet.neonlabs.org/solana"],
        blockExplorerUrls: [`https://neon-labs.org/`],
      },
    ],
  },
  [SupportedChainId.ARBITRUM_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: SupportedChainId.ARBITRUM_MAINNET,
        chainName: "Arbitrum Mainnet",
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
        blockExplorerUrls: [`https://arbiscan.io`],
      },
    ],
  },
  [SupportedChainId.OPTIMISM_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: SupportedChainId.OPTIMISM_MAINNET,
        chainName: "Optimistic Ethereum Mainnet",
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.optimism.io"],
        blockExplorerUrls: [`https://optimistic.etherscan.io`],
      },
    ],
  },
  [SupportedChainId.AVALANCHE_MAINNET]: {
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: SupportedChainId.AVALANCHE_MAINNET,
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
        chainId: SupportedChainId.OKEX_MAINNET,
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
      chainId: SupportedChainId.HECO_MAINNET,
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
export interface NetworkOptionModel {
  chainId: string,
  icon: string,
  name: string
}
export const networkOptions: NetworkOptionModel[] = [
  {
    chainId: SupportedChainId.ETHEREUM_MAINNET,
    icon: 'assets/images/networks/eth.svg',
    name: 'Ethereum Mainnet'
  },
  {
    chainId:SupportedChainId.BSC_MAINNET,
    icon: 'assets/images/networks/bsc.svg',
    name: 'BSC Mainnet'
  },
  {
    chainId: SupportedChainId.POLYGON_MAINNET,
    icon: 'assets/images/networks/polygon.svg',
    name: 'Polygon Mainnet'
  },
  {
    chainId: SupportedChainId.SOLANA_MAINNET,
    icon: 'assets/images/networks/solana.svg',
    name: 'Solana Mainnet'
  },
  {
    chainId: SupportedChainId.ARBITRUM_MAINNET,
    icon: 'assets/images/networks/arbitrum.svg',
    name: 'Arbitrum Mainnet'
  },
  {
    chainId: SupportedChainId.OPTIMISM_MAINNET,
    icon: 'assets/images/networks/optimism.svg',
    name: 'Optimism Mainnet'
  },
  {
    chainId: SupportedChainId.AVALANCHE_MAINNET,
    icon: 'assets/images/networks/avalance.svg',
    name: 'Avalanche Mainnet'
  },
  {
    chainId: SupportedChainId.FANTOM_MAINNET,
    icon: 'assets/images/networks/fantom.svg',
    name: 'Fantom Mainnet'
  },
  {
    chainId: SupportedChainId.OKEX_MAINNET,
    icon: 'assets/images/networks/okex.svg',
    name: 'Okex Chain Mainnet'
  }
]