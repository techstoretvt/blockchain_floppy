require("dotenv").config();
const Web3 = require("web3");
const ABI = require('../artifacts/contracts/Token.sol/Floppy.json');


const floppyAbi = ABI.abi
const floppyAddress = process.env.PLOPPY_ADDRESS //mã khi deploy
const myPrivateKey = process.env.PRIV_KEY
const myAdress = process.env.MY_ADDRESS //address của account khai báo trong hardhat
const addressShop = process.env.ADDRESS_SHOP //address của account khai báo trong hardhat
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

            console.log(rs.effectiveGasPrice);

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

async function tranfer_ks(id_a, amount, id_phong, tenKhach, email, sdt) {
    const web3 = await new Web3(process.env.HOST)
    const floppyContract = await new web3.eth.Contract(floppyAbi, floppyAddress)

    /// Call function from contract: call, send
    /// Call
    const myBalance = await floppyContract.methods.balanceOf(id_a).call()
    console.log("myBalance: ", myBalance);
    /// Send --> modify the state of t he blockchain
    /// tranfer token
    await web3.eth.accounts.wallet.add(myPrivateKey)
    const receiverBalanceBefore = await floppyContract.methods.balanceOf(addressShop).call()

    const rs = await floppyContract.methods.transfer(addressShop, amount).send({
        from: id_a,
        gas: 3000000
    })

    let id_tranfer = rs.events.Transfer.id
    let gasPrice = rs.effectiveGasPrice

    const receiverBalanceAfter = await floppyContract.methods.balanceOf(addressShop).call()

    const myBalanceAfter = await floppyContract.methods.balanceOf(id_a).call()
    // console.log(rs);
    console.log(receiverBalanceBefore, receiverBalanceAfter);
    console.log("Transfer success");



    //luu lich su
    let time = new Date().getTime() / 1000;
    time = Math.floor(time);
    luuLichSuDatPhong(id_tranfer, id_phong, id_a, addressShop, amount, time, gasPrice, tenKhach, email, sdt)
        .then(() => console.log("Lich su added successfully"))
        .catch(err => console.error("Error adding lich su:", err));


    return {
        balanceA: myBalanceAfter,
        balanceB: receiverBalanceAfter
    }

}

async function addHotel(tenPhong, donGia, tienIch, KhuyenMai, anh1, anh2) {
    const web3 = await new Web3(process.env.HOST)
    const floppyContract = new web3.eth.Contract(floppyAbi, floppyAddress);

    // Tạo một địa chỉ ví ngẫu nhiên cho khách sạn
    const hotelAccount = web3.eth.accounts.create();
    const newAddress = hotelAccount.address;
    console.log("newAddress: ", newAddress);

    // return
    // Tạo giao dịch để gọi hàm addHotel
    const tx = {
        from: myAdress,
        to: floppyAddress,
        gas: 2000000, // Có thể cần điều chỉnh tùy theo hợp đồng của bạn
        data: floppyContract.methods.addHotel(newAddress, tenPhong, donGia, tienIch, KhuyenMai, anh1, anh2).encodeABI()
    };

    // Ký giao dịch bằng khóa bí mật
    const signedTx = await web3.eth.accounts.signTransaction(tx, myPrivateKey);

    // Gửi giao dịch và nhận hash giao dịch
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction successful with hash: ${receipt.transactionHash}`);
    return {
        status: "OK"
    }
}

// addHotel("Phong 3", 20000, "Danh sach tien ich", 10, 'link anh 1', 'link anh 2')
//     .then(() => console.log("Hotel added successfully"))
//     .catch(err => console.error("Error adding hotel:", err));

async function getHotel(hotelAddress) {
    try {
        const web3 = await new Web3(process.env.HOST)
        const floppyContract = new web3.eth.Contract(floppyAbi, floppyAddress);

        // Gọi hàm getStudent từ hợp đồng
        const hotel = await floppyContract.methods.getStudent(hotelAddress).call();

        // In thông tin sinh viên ra console
        // console.log(`Ten Phong: ${hotel[0]}`);
        // console.log(`Price: ${hotel[1]}`);
        // console.log(`Tien Ich: ${hotel[2]}`);
        // console.log(`Khuyen Mai: ${hotel[3]}`);
        // console.log(`Anh 1: ${hotel[4]}`);
        // console.log(`Anh 2: ${hotel[5]}`);

        return hotel
    } catch (error) {
        console.error("Error getting hotel:", error);
    }
}

// Thay thế địa chỉ sinh viên bằng địa chỉ thực tế của bạn
// getHotel("0xE43877eC85F49ce4276162676F11Cc409d91d494")
//     .then(() => console.log("Hotel information retrieved successfully"))
//     .catch(err => console.error("Error retrieving student information:", err));


async function getAllHotel() {
    try {
        const web3 = await new Web3(process.env.HOST)
        const floppyContract = new web3.eth.Contract(floppyAbi, floppyAddress);

        // Gọi hàm getStudent từ hợp đồng
        const hotel = await floppyContract.methods.getAllStudents().call();

        // In thông tin sinh viên ra console

        let listHotel = []
        for (let address of hotel) {
            let ht = await getHotel(address)
            listHotel.push({ address, ...ht })
        }

        // console.log(`List hotels: ${listHotel}`);
        return listHotel

    } catch (error) {
        console.error("Error getting hotel:", error);
    }
}
// getAllHotel()
//     .then(() => console.log("Hotels information retrieved successfully"))
//     .catch(err => console.error("Error retrieving student information:", err));


async function initHotel() {
    try {
        let listDataHotel = [
            {
                address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                tenPhong: "Phòng 101",
                donGia: 350000,
                tienIch: "Bồn tắm nước nóng. Truyền hình cáp/vệ tinh, Điện thoại bàn, Internet không dây, Đồ vệ sinh cá nhân miễn phí, Áo choàng tắm được cung cấp. Máy lạnh. Tủ lạnh mini. Bộ khăn trải giường và khăn tắm được thay mỗi ngày",
                KhuyenMai: 10,
                anh1: "https://res.cloudinary.com/dultkpqjp/image/upload/v1702107825/quanlykhachsan/aptladyynhe7d77ovgbj.jpg",
                anh2: "https://res.cloudinary.com/dultkpqjp/image/upload/v1702107825/quanlykhachsan/kvvyjr5rbv9e7sj5xphn.jpg"
            },
            {
                address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                tenPhong: "Phòng 102",
                donGia: 300000,
                tienIch: "Bồn tắm/vòi sen. Tủ lạnh mini. Đồ vệ sinh cá nhân/khăn tắm/Bộ khăn trải giường được thay mới mỗi ngày. Phòng có tầm nhìn ra hồ bơi của khách sạn. Cửa sooe kính rộng, thoáng mát bao quát toàn cảnh thành phố mang đến một",
                KhuyenMai: 0,
                anh1: "https://res.cloudinary.com/dultkpqjp/image/upload/v1702108114/quanlykhachsan/zmdazzlv6pdf3tn49d9i.jpg",
                anh2: "https://res.cloudinary.com/dultkpqjp/image/upload/v1702108115/quanlykhachsan/zh8qdej14khqoazbhmzu.jpg"
            },
            {
                address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
                tenPhong: "Phòng VIP1",
                donGia: 2000000,
                tienIch: "Phòng tắm, Giấy vệ sinh, Bồn tắm hoặc Vòi sen, Dép, Nhà vệ sinh, Đồ vệ sinh cá nhân miễn phí, Áo choàng tắm, Bồn tắm, Vòi sen, Dịch vụ giặt ủi, Dọn phòng hàng ngày, Dịch vụ là (Phụ phí), Giặt ủi (Phụ phí), Giặt khô",
                KhuyenMai: 0,
                anh1: "https://res.cloudinary.com/dultkpqjp/image/upload/v1702138753/quanlykhachsan/wnrngt3jrebrtz53aksx.jpg",
                anh2: "https://res.cloudinary.com/dultkpqjp/image/upload/v1702138754/quanlykhachsan/xuq3qouvglhep4zhxce3.jpg"
            }
        ]

        for (let hotel of listDataHotel) {
            await addHotel(hotel.tenPhong, hotel.donGia, hotel.tienIch, hotel.KhuyenMai, hotel.anh1, hotel.anh2)
        }

    } catch (error) {
        console.error("Error getting hotel:", error);
    }
}




async function luuLichSuDatPhong(idTranfer, addressPhong, addressFrom, addressTo, amount, time, gasPrice, tenKhach, email, sdt) {
    try {
        const web3 = await new Web3(process.env.HOST)
        const floppyContract = new web3.eth.Contract(floppyAbi, floppyAddress);

        // Tạo một địa chỉ ví ngẫu nhiên cho khách sạn
        const hotelAccount = web3.eth.accounts.create();
        const newAddress = hotelAccount.address;
        console.log("newAddress: ", newAddress);

        // return
        // Tạo giao dịch để gọi hàm addHotel
        const tx = {
            from: myAdress,
            to: floppyAddress,
            gas: 2000000, // Có thể cần điều chỉnh tùy theo hợp đồng của bạn
            data: floppyContract.methods.addLichSu(newAddress, idTranfer, addressPhong, addressFrom, addressTo, amount, time, gasPrice, tenKhach, email, sdt).encodeABI()
        };

        // Ký giao dịch bằng khóa bí mật
        const signedTx = await web3.eth.accounts.signTransaction(tx, myPrivateKey);

        // Gửi giao dịch và nhận hash giao dịch
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log(`Transaction successful with hash: ${receipt.transactionHash}`);
        return {
            status: "OK"
        }

    } catch (error) {
        console.error("Error getting hotel:", error);
    }
}

// luuLichSuDatPhong('log_9c244db9', 'address phong', 'address from', 'address to', 100, 1010101, 12000, 'ten khach', 'email', 'sdt')
//     .then(() => console.log("Lich su added successfully"))
//     .catch(err => console.error("Error adding lich su:", err));

async function getLichSu(lichSuAddress) {
    try {
        const web3 = await new Web3(process.env.HOST)
        const floppyContract = new web3.eth.Contract(floppyAbi, floppyAddress);

        // Gọi hàm getStudent từ hợp đồng
        const lichSu = await floppyContract.methods.getLichSu(lichSuAddress).call();

        // In thông tin sinh viên ra console
        // console.log(`IdTranfer: ${lichSu[0]}`);
        // console.log(`Address Phong: ${lichSu[1]}`);
        // console.log(`Address From: ${lichSu[2]}`);
        // console.log(`Address To: ${lichSu[3]}`);
        // console.log(`Amount: ${lichSu[4]}`);
        // console.log(`Time: ${lichSu[5]}`);
        // console.log(`Gas price: ${lichSu[6]}`);
        // console.log(`Ten Khach: ${lichSu[7]}`);
        // console.log(`Email: ${lichSu[8]}`);
        // console.log(`Sdt: ${lichSu[9]}`);

        return lichSu
    } catch (error) {
        console.error("Error getting hotel:", error);
    }
}

// getLichSu("0x7066124B66426bc76c00E35FBD1028bfB1E69aA1")
//     .then(() => console.log("Lich su information retrieved successfully"))
//     .catch(err => console.error("Error retrieving lich su information:", err));


async function getAllLichSu() {
    try {
        const web3 = await new Web3(process.env.HOST)
        const floppyContract = new web3.eth.Contract(floppyAbi, floppyAddress);

        // Gọi hàm getStudent từ hợp đồng
        const lichSu = await floppyContract.methods.getAllLichSu().call();

        // In thông tin sinh viên ra console

        let listLichSu = []
        for (let address of lichSu) {
            console.log(address);

            let lichSu = await getLichSu(address)
            listLichSu.push({ address, ...lichSu })
        }

        // console.log(`List lich su: ${listLichSu}`);
        return listLichSu

    } catch (error) {
        console.error("Error getting hotel:", error);
    }
}
// getAllLichSu()
//     .then(() => console.log("Lich su information retrieved successfully"))
//     .catch(err => console.error("Error retrieving lich su information:", err));





// initHotel()
//     .then(() => console.log("Hotels init successfully"))
//     .catch(err => console.error("Error init hotel:", err));

module.exports = {
    interact,
    tranfer,
    tranfer_ks,
    getBalance,
    getAllHotel,
    addHotel,
    luuLichSuDatPhong,
    getAllLichSu
}