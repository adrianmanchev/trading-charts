import { createStore } from 'vuex'

const slugs = {
  algorand: 'ALGO',
  bitcoin: 'BTC',
  bnb: 'BNB',
  cardano: 'ADA',
  ethereum: 'ETH',
  polkadot: 'DOT',
  ripple: 'XRP',
  solana: 'SOL',
  tron: 'TRX'
}

export default createStore({
  state: {
    top: [
      'BTC',
      'ETH',
      'SOL'
    ],
    pairs: [
      'adausdt',
      'algousdt',
      'bnbusdt',
      'btcusdt',
      'dotusdt',
      'ethusdt',
      'solusdt',
      'xrpusdt',
      'trxusdt'
    ],
    tickers: {},
    infos: {},
    metas: {
      ADA: {
        name: 'Cardano',
        slug: 'cardano',
        symbol: 'ada',
        urls: {
          website: 'https://www.cardano.org/'
        },
        about: 'Cardano is a proof-of-stake blockchain platform that says its goal is to allow "changemakers, innovators and visionaries" to bring about positive global change.',
        logo: require('../assets/img/ada.png')
      },
      ALGO: {
        name: 'Algorand',
        slug: 'algorand',
        symbol: 'algo',
        urls: {
          website: 'https://www.algorand.com'
        },
        about: 'Algorand is a self-sustaining, decentralized, blockchain-based network that supports a wide range of applications.',
        logo: require('../assets/img/algo.png')
      },
      BNB: {
        name: 'BNB',
        slug: 'bnb',
        symbol: 'bnb',
        urls: {
          website: 'https://www.binance.com'
        },
        about: 'Launched in July 2017, Binance is the biggest cryptocurrency exchange globally based on daily trading volume. Binance aims to bring cryptocurrency exchanges to the forefront of financial activity globally.',
        logo: require('../assets/img/bnb.png')
      },
      BTC: {
        name: 'Bitcoin',
        slug: 'bitcoin',
        symbol: 'btc',
        urls: {
          website: 'https://bitcoin.org'
        },
        about: 'Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.',
        logo: require('../assets/img/btc.png')
      },
      DOT: {
        name: 'Polkadot',
        slug: 'polkadot',
        symbol: 'dot',
        urls: {
          website: 'https://polkadot.network/'
        },
        about: 'Polkadot is an open-source sharded multichain protocol that connects and secures a network of specialized blockchains, facilitating cross-chain transfer of any data or asset types, not just tokens, thereby allowing blockchains to be interoperable with each other.',
        logo: require('../assets/img/dot.png')
      },
      ETH: {
        name: 'Ethereum',
        slug: 'ethereum',
        symbol: 'eth',
        urls: {
          website: 'https://www.ethereum.org'
        },
        about: 'Ethereum is a decentralized open-source blockchain system that features its own cryptocurrency, Ether. ETH works as a platform for numerous other cryptocurrencies, as well as for the execution of decentralized smart contracts.',
        logo: require('../assets/img/eth.png')
      },
      SOL: {
        name: 'Solana',
        slug: 'solana',
        symbol: 'sol',
        urls: {
          website: 'https://solana.com'
        },
        about: 'Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions.',
        logo: require('../assets/img/sol.png')
      },
      TRX: {
        name: 'Tron',
        slug: 'tron',
        symbol: 'trx',
        urls: {
          website: 'https://tron.network'
        },
        about: 'TRON (TRX) is a decentralized blockchain-based operating system developed by the Tron Foundation and launched in 2017. Originally TRX tokens were ERC-20-based tokens deployed on Ethereum, but a year later they were moved to their own network.',
        logo: require('../assets/img/trx.png')
      },
      XRP: {
        name: 'Ripple',
        slug: 'ripple',
        symbol: 'xrp',
        urls: {
          website: 'https://xrpl.org'
        },
        about: 'Ripple is the currency that runs on a digital payment platform called RippleNet, which is on top of a distributed ledger database called XRP Ledger.',
        logo: require('../assets/img/xrp.png')
      }
    },
    units: {
      USDT: 'Tether'
    },
    baseUnits: 'usdt',
    graphOptions: {
      interval: '15m'
    },
    graphStats: {
      min: 0,
      max: 0
    }
  },
  getters: {
    topCurrencies: state => {
      return state.top.map(symbol => (({ about, logo, name, slug, symbol }) => ({ about, logo, name, slug, symbol }))(state.metas[symbol]))
    },
    getCurrencyBySlug: (state) => (slug) => {
      return state.metas[slugs[slug]] || {}
    },
    getTickerBySlug: (state) => (slug) => {
      const pair = slugs[slug].toLowerCase() + '' + state.baseUnits
      return state.tickers[pair] || {}
    },
    getInfoBySlug: (state) => (slug) => {
      const pair = slugs[slug].toLowerCase() + '' + state.baseUnits
      return state.infos[pair] || {}
    },
    getGraphStats: (state) => () => {
      return state.graphStats || {}
    }
  },
  mutations: {
    UPDATE_INFO: (state, payload) => {
      state.infos[payload.pair] = {
        ...state.infos[payload.pair],
        ...payload
      }
    },
    UPDATE_TICKER: (state, payload) => {
      state.tickers[payload.pair] = {
        ...state.tickers[payload.pair],
        ...payload
      }
    },
    UPDATE_GRAPH_OPTIONS: (state, payload) => {
      state.graphOptions = {
        ...state.graphOptions,
        ...payload
      }
    },
    UPDATE_GRAPH_STATS: (state, payload) => {
      state.graphStats = {
        ...state.graphStats,
        ...payload
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
