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
      accounts: [process.env.PRIV_KEY, '0xe8ddb214b7216fd97bc55b697302c7d3d97e0f20bad6ff72f46aa40826e3d3ca']
    }
  },
};
