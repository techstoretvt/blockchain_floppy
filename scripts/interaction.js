require("dotenv").config();
const Web3 = require("web3");
const floppyAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
const floppyAddress = process.env.PLOPPY_ADDRESS //mã khi deploy
const myPrivateKey = process.env.PRIV_KEY
const myAdress = process.env.MY_ADDRESS //address của account khai báo trong hardhat
const receiverAddress = "0xfe9a28761667484A01375a0334F38a0E8989E2E6" // address của người nhận

async function interact() {
    const web3 = await new Web3('http://127.0.0.1:7545')
    const floppyContract = await new web3.eth.Contract(floppyAbi, floppyAddress)

    /// Call function from contract: call, send
    /// Call
    const myBalance = await floppyContract.methods.balanceOf(myAdress).call()
    console.log("myBalance: ", myBalance);
    /// Send --> modify the state of t he blockchain
    /// tranfer token
    await web3.eth.accounts.wallet.add(myPrivateKey)
    const receiverBalanceBefore = await floppyContract.methods.balanceOf(receiverAddress).call()

    const rs = await floppyContract.methods.transfer(receiverAddress, 1000000000 * 100000).send({
        from: myAdress,
        gas: 3000000
    })
    const receiverBalanceAfter = await floppyContract.methods.balanceOf(receiverAddress).call()

    // console.log(rs);
    console.log(receiverBalanceBefore, receiverBalanceAfter);

}

async function getBalance(idAccount) {
    const web3 = await new Web3('http://127.0.0.1:7545')
    const floppyContract = await new web3.eth.Contract(floppyAbi, floppyAddress)

    /// Call function from contract: call, send
    /// Call
    const myBalance = await floppyContract.methods.balanceOf(idAccount).call()

    return myBalance

}

async function tranfer(id_a, id_b, amount) {
    const web3 = await new Web3('http://127.0.0.1:7545')
    const floppyContract = await new web3.eth.Contract(floppyAbi, floppyAddress)

    /// Call function from contract: call, send
    /// Call
    const myBalance = await floppyContract.methods.balanceOf(id_a).call()
    console.log("myBalance: ", myBalance);
    /// Send --> modify the state of t he blockchain
    /// tranfer token
    await web3.eth.accounts.wallet.add(myPrivateKey)
    const receiverBalanceBefore = await floppyContract.methods.balanceOf(id_b).call()

    const rs = await floppyContract.methods.transfer(id_b, amount).send({
        from: id_a,
        gas: 3000000
    })
    const receiverBalanceAfter = await floppyContract.methods.balanceOf(id_b).call()

    const myBalanceAfter = await floppyContract.methods.balanceOf(id_a).call()
    // console.log(rs);
    console.log(receiverBalanceBefore, receiverBalanceAfter);
    return {
        balanceA: myBalanceAfter,
        balanceB: receiverBalanceAfter
    }

}

async function tranfer_ks(id_a, amount) {
    const web3 = await new Web3('http://127.0.0.1:7545')
    const floppyContract = await new web3.eth.Contract(floppyAbi, floppyAddress)

    /// Call function from contract: call, send
    /// Call
    const myBalance = await floppyContract.methods.balanceOf(id_a).call()
    console.log("myBalance: ", myBalance);
    /// Send --> modify the state of t he blockchain
    /// tranfer token
    await web3.eth.accounts.wallet.add(myPrivateKey)
    const receiverBalanceBefore = await floppyContract.methods.balanceOf(myAdress).call()

    const rs = await floppyContract.methods.transfer(myAdress, amount).send({
        from: id_a,
        gas: 3000000
    })
    const receiverBalanceAfter = await floppyContract.methods.balanceOf(myAdress).call()

    const myBalanceAfter = await floppyContract.methods.balanceOf(id_a).call()
    // console.log(rs);
    console.log(receiverBalanceBefore, receiverBalanceAfter);
    return {
        balanceA: myBalanceAfter,
        balanceB: receiverBalanceAfter
    }

}

module.exports = {
    interact,
    tranfer,
    tranfer_ks,
    getBalance
}