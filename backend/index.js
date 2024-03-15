const express = require('express');
const app = express();

const cors = require('cors')  // cors is used for cors error
const Jwt = require('jsonwebtoken')  // Generating Token 
const Jwtkey = "e-comm" // Token key

require('./Db/config'); // Import mongoose connect
const User = require('./Db/User') // Import userSchema
const Product = require('./Db/product'); // Import productSchema
const product = require('./Db/product');
const port = 4000;

app.use(express.json())
app.use(cors())


// SignUp API
app.post('/register', async (req, res) => {
  let user = new User(req.body)
  let result = await user.save()
  result = result.toObject()
  delete result.Password
  Jwt.sign({ result }, Jwtkey, { expiresIn: "12hr" }, (err, token) => {
    { err && res.send({ result: "something went wrong" }) }
    { !err && res.send({ result, auth: token }) }
    console.log(token)
  })
})

//Login API
app.post("/login", async (req, res) => {
  if (req.body.Password && req.body.Email) {
    let user = await User.findOne(req.body).select('-Password')
    {
      user ? (
        Jwt.sign({ user }, Jwtkey, { expiresIn: "12hr" }, (err, token) => {
          { err && res.send({ result: "something went wrong" }) }
          { !err && res.send({ user, auth: token }) }
        })) :
        res.send({ result: "error found" })
    }
  }
  else {
    res.send({ result: "error found" })
  }
})

// Add data API
app.post("/add/product", async (req, res) => {
  let Pro = new Product(req.body)
  let result = await Pro.save()
  res.send(result)
})

// Get API of Product List
app.get("/product", async (req, res) => {
  let pageNo = req.query ? req.query.pageNo : 1;
  let pageLimit = 5;
  let skipfn = (pageNo-1)*pageLimit
  let products = await Product.find().skip(skipfn).limit(pageLimit)
  let pro = await Product.countDocuments()
  if (products.length > 0) {
    // console.log(products)
    res.send({
      totalpages: Math.ceil(pro / pageLimit),
      currentPage: pageNo,
      data: products,
    })
  }
  else {
    res.send({ result: "error found" })
  }
})

//Delete API by id in Product List
app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id })
  res.send(result)
})

// Get API by Id for updating a Product List
app.get("/product/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  { result ? res.send(result) : res.send({ result: "error found" }) }
})

// Update API 
app.put("/product/:id", async (req, res) => {
  const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
  res.send(result)
})

// Search API 
app.get("/search/:key", async (req, res) => {
  let result = await product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ]
  })
  res.send(result)
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
