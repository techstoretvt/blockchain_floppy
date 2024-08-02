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
    console.log(amount);
    try {
        let balance = await Interaction.tranfer_ks(id_a, amount)

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})