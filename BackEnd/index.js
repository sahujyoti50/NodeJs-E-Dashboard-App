const express = require('express');
require('./db/config');
const cors = require('cors');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();
app.use(express.json());
const Jwt = require('jsonwebtoken');
const JwtKey = "e-comm";

app.use(cors());
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ user }, JwtKey, { expiresIn: "1m" }, (err, token) => {
        if (err) {
            res.send({ result: "error occured" });
        }
        res.send({ user, auth: token });

    })
})

app.post('/login', async (req, res) => {
    // to remove password field
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "error occured" });
                }
                res.send({ user, auth: token });

            })
        } else {
            res.send({ result: "no user found" });
        }
    } else {
        res.send("no result found,add 1 more field")
    }
});
app.post('/add-product', verifyToken, async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
});
app.get('/products', verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send([])
    }
});
app.delete('/product/:id', verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get('/product/:id', async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "no result found" });
    }
});
app.put("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, {
        $set: req.body
    });
    res.send(result);
});
app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
        ]
    });
    res.send(result);
});

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        console.log("middleware called", token);
        Jwt.verify(token, JwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide valid token" })

            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "Please add token with header" })
    }

}
app.listen(5000);   