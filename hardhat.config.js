require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    bsctest: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545",
      accounts: [process.env.PRIV_KEY],
    },
    ganache: {
      url: process.env.GANACHE_URL || 'http://127.0.0.1:7545',
      accounts: [process.env.PRIV_KEY]
    },
    go: {
      url: 'http://127.0.0.1:8545',
      accounts: [process.env.PRIV_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY
  }
};
