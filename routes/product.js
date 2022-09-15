var express = require("express");
var router = express.Router();
var productModel = require("../models/product");
var moment = require('moment')

/* GET home page. */
// router.get('/tht', function(req, res, next) {
//   res.send('production');
// });

router.post("/", async (req, res) => {
  try {

    
    let { product_name, price, amount,  } = req.body;

    let newproduct = new productModel({
      product_name: product_name,
      price: price,
      amount: amount,
      
    
    });

        // mement(product.createdAt).lacotion(th).format('LLLL')
    let product = await newproduct.save();
    
    return res.status(200).send({
      data: product,
      message: "create product",
      status: true
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      status: false
    });
  }
});



// get product all
router.get("/", async (req, res) => {
  try {
    let products = await productModel.find({});
   // let date = moment(products.createdAt).lacotion(th).format('LLLL')
    return res.status(200).send({
      data: products,
      message: "success",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "server error",
      success: false,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const curd = await productModel.findOne({ _id: id});

    if (!curd) {
      return res.status(400).json({ message: "Item does not Exite" });
    }
    //  if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).send({
    //         message: 'id Invalid',
    //         success : false,
    //         error : ["id is not a ObectId"],
    //     });
    //  }
    //  let products = await productModel.findById(id);
    res.status(200).send({
      data: curd,
      message: "success",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "server error",
      success: false,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let crud = await productModel.findByIdAndUpdate({_id:id }, { $set: req.body } )
    if (!crud){
        return res.status(404).json({message: 'No Item with that ID'});
    }
    // await productModel.updateOne(
    //   { _id: id },
    //   { $set: req.body }
    // );
     let product = await productModel.findById(id);

    return res.status(201).send({
      data: product,
      message: "success",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "server error",
      success: false,
    });
  }
});




//--------------------dalete -------------------------
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let crud = await productModel.findByIdAndDelete({_id : id})
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).send({
    //     message: "id Invalid",
    //     success: false,
    //     error: ["id is not a ObectId"],
    //   });
    // }
     let products = await productModel.findById(id);
    return res.status(200).send({
      data: products,
      message: "sucess",
      status: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "server error",
      status: false,
    });
  }
});

module.exports = router;


//mongoose.Types.ObjectId.isValid()