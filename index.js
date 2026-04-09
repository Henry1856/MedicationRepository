
const mongoose = require('mongoose');
const express = require('express');
const Product = require('./productModel');
const app = express();
app.use(express.json());

const MONGODB_URI = "mongodb://localhost:27017/";
const PORT = 5000;

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log(' Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error(' Error connecting to MongoDB:', error);
});

app.get("/all-product", async (req, res) =>{
    const allProduct = await Product.find()

    res.status(200).json({
        message: "success",
        allProduct})
})

app.post("/create-product", async (req, res) =>{
    const {name, price, quantity} = req.body

    if (!name || !price)
    {
        return res.status(400).json({
            message: "please enter all fields"
        })
    }
    const newProduct = new Product ({name, price, quantity})

    await newProduct.save()

    res.status(201).json({
        message: " success",
        newProduct
    })

})

app.put("/update-product/:id", async(req, res)=>{
    const {id} = req.params
    const {name, price, quantity} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({message:"invalid Id"})

    }
    const update = await Product.findByIdAndUpdate(id, {name, price, quantity},
        {new:true}

    )
    res.status(201).json({message: "success",
        update
    })

})

app.patch ("/update/:id",async (req,res)=>{
    const {id} = req.params
    const {name} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({message:"invalid Id"})

    }
    const updates = await Product.findById(id)
    if(updates){
        updates.name= name
        await updates.save()
        return    res.status(201).json({message:"success", updates})

    }else{
        return res.status(201).json({message:"product not found"})
    }
   
})
app.delete("/delete-product/:id", async (req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({message:"invalid Id"})

    }

    const deleteProduct = await Product.findByIdAndDelete(id)

    return res.status(200).json({message:"product deleted successfully"})

})
