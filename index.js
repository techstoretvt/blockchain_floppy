const express = require('express')
const app = express()
const port = 3002
const cors = require('cors');
const Interaction = require('./scripts/interaction')


app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use(cors())

app.get('/', (req, res) => {

    let id_a = "0x7C04BbDddF602512e917833aBB003C0b5a7e8625"
    let id_b = "0x8f38Af87D5050B46ac1C067e2F39e5C1CeaabcEC"
    let amount = 1000000000 * 100000
    Interaction.tranfer(id_a, id_b, amount)
    res.send('Hello World!')
})

app.get('/get-balance', async (req, res) => {

    if (!req?.query.idAccount) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Not found idAccount"
        })
    }

    let idAccount = req?.query.idAccount
    let balance = await Interaction.getBalance(idAccount)

    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        data: balance
    })
})

app.get('/transfer', async (req, res) => {

    if (!req?.query.id_a || !req.query.id_b || !req.query.amount) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Not found id_a or id_b or amount"
        })
    }

    let id_a = req?.query.id_a
    let id_b = req.query.id_b
    let amount = +req.query.amount
    console.log('amount: ', amount);
    try {
        let balance = await Interaction.tranfer(id_a, id_b, amount)

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            data: balance
        })
    } catch (error) {
        return res.status(301).json({
            errCode: 1,
            errMessage: error.data.reason,
        })
    }

})

app.get('/transfer-ks', async (req, res) => {

    if (!req?.query.id_a || !req.query.amount) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Not found id_a or amount"
        })
    }

    let id_a = req?.query.id_a
    let amount = +req.query.amount
    let id_phong = req.query.id_phong
    let tenKhach = req.query.tenKhach
    let email = req.query.email
    let sdt = req.query.sdt

    console.log(amount);
    try {
        let balance = await Interaction.tranfer_ks(id_a, amount, id_phong, tenKhach, email, sdt)

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            data: balance
        })
    } catch (error) {
        return res.status(301).json({
            errCode: 1,
            errMessage: error.data.reason,
        })
    }

})


app.get('/get-all-hotel', async (req, res) => {

    try {
        let hotels = await Interaction.getAllHotel()

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            data: hotels
        })
    } catch (error) {
        return res.status(301).json({
            errCode: 1,
            errMessage: error.data.reason,
        })
    }

})

app.get('/add-hotel', async (req, res) => {

    let tenPhong = req?.query.tenPhong
    let donGia = +req.query.donGia
    let khuyenMai = +req.query.khuyenMai
    let tienIch = req?.query.tienIch
    let anh1 = req?.query.anhPhong1
    let anh2 = req?.query.anhPhong2


    try {
        // let hotel = await Interaction.addHotel(tenPhong, donGia, tienIch, khuyenMai, anh1, anh2)
        await Interaction.addHotel(tenPhong, donGia, tienIch, khuyenMai, anh1, anh2)
            .then(() => {
                console.log("Hotel added successfully")
                return res.status(200).json({
                    errCode: 0,
                    errMessage: "OK",
                })
            })
            .catch(err => {
                console.error("Error adding hotel:", err)
                return res.status(500).json({
                    errCode: 1,
                    errMessage: "Error"
                })
            });



    } catch (error) {
        return res.status(301).json({
            errCode: 1,
            errMessage: error.data.reason,
        })
    }

})


app.get('/get-all-lich-su', async (req, res) => {

    try {
        let listLichSu = await Interaction.getAllLichSu()

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            data: listLichSu
        })
    } catch (error) {
        return res.status(301).json({
            errCode: 1,
            errMessage: error.data.reason,
        })
    }

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})