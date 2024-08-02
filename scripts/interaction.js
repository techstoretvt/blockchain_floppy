require("dotenv").config();
const Web3 = require("web3");
const ABI = require('../artifacts/contracts/Token.sol/Floppy.json');


const floppyAbi = ABI.abi
const floppyAddress = process.env.PLOPPY_ADDRESS //mã khi deploy
const myPrivateKey = process.env.PRIV_KEY
const myAdress = process.env.MY_ADDRESS //address của account khai báo trong hardhat
const receiverAddress = "0xfe9a28761667484A01375a0334F38a0E8989E2E6" // address của người nhận

async function interact() {
    const web3 = await new Web3(process.env.HOST)
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
    const web3 = await new Web3(process.env.HOST)
    const floppyContract = await new web3.eth.Contract(floppyAbi, floppyAddress)

    /// Call function from contract: call, send
    /// Call
    const myBalance = await floppyContract.methods.balanceOf(idAccount).call()

    return myBalance

}

async function tranfer(id_a, id_b, amount) {

    return new Promise(async (resolve, reject) => {
        try {

            const web3 = await new Web3(process.env.HOST)
            const floppyContract = await new web3.eth.Contract(floppyAbi, floppyAddress)

            /// Call function from contract: call, send
            /// Call
            const myBalance = await floppyContract.methods.balanceOf(id_a).call()
            const receiverBalanceBefore = await floppyContract.methods.balanceOf(id_b).call()



            /// Send --> modify the state of t he blockchain
            /// tranfer token
            await web3.eth.accounts.wallet.add(myPrivateKey)
            console.log('vao 1');

            const rs = await floppyContract.methods.transfer(id_b, amount).send({
                from: id_a,
                gas: 3000000
            })


            console.log('vao 2');


            const receiverBalanceAfter = await floppyContract.methods.balanceOf(id_b).call()
            const myBalanceAfter = await floppyContract.methods.balanceOf(id_a).call()

            console.log("Balance A: ", myBalance, myBalanceAfter);
            console.log("Balance B: ", receiverBalanceBefore, receiverBalanceAfter);

            resolve({
                balanceA: myBalanceAfter,
                balanceB: receiverBalanceAfter
            })
        } catch (error) {
            reject(error)
        }
    })


}

async function tranfer_ks(id_a, amount) {
    const web3 = await new Web3(process.env.HOST)
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

async function addStudent(studentAddress, name, age) {
    const web3 = await new Web3(process.env.HOST)
    const floppyContract = new web3.eth.Contract(floppyAbi, floppyAddress);

    // Tạo giao dịch để gọi hàm addStudent
    const tx = {
        from: myAdress,
        to: floppyAddress,
        gas: 2000000, // Có thể cần điều chỉnh tùy theo hợp đồng của bạn
        data: floppyContract.methods.addStudent(studentAddress, name, age).encodeABI()
    };

    // Ký giao dịch bằng khóa bí mật
    const signedTx = await web3.eth.accounts.signTransaction(tx, myPrivateKey);

    // Gửi giao dịch và nhận hash giao dịch
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction successful with hash: ${receipt.transactionHash}`);
}

// addStudent("0x056950345b331a1f7F0cBCC8AE118Ea51D78f01d", "John Doe", 20)
//     .then(() => console.log("Student added successfully"))
//     .catch(err => console.error("Error adding student:", err));

async function getStudent(studentAddress) {
    try {
        const web3 = await new Web3(process.env.HOST)
        const floppyContract = new web3.eth.Contract(floppyAbi, floppyAddress);

        // Gọi hàm getStudent từ hợp đồng
        const student = await floppyContract.methods.getStudent(studentAddress).call();

        // In thông tin sinh viên ra console
        console.log(`Name: ${student[0]}`);
        console.log(`Age: ${student[1]}`);
    } catch (error) {
        console.error("Error getting student:", error);
    }
}

// Thay thế địa chỉ sinh viên bằng địa chỉ thực tế của bạn
// getStudent("0x056950345b331a1f7F0cBCC8AE118Ea51D78f01d")
//     .then(() => console.log("Student information retrieved successfully"))
//     .catch(err => console.error("Error retrieving student information:", err));


module.exports = {
    interact,
    tranfer,
    tranfer_ks,
    getBalance
}