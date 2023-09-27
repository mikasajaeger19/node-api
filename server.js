const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

// middleware to accept json data
app.use(express.json());

// middleware to accept form data
app.use(express.urlencoded({extended: false}));

//routes
app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/about', function(req, res){
    res.send('About Page nigga');
});

app.get('/product', async function(req, res){
    try {
        //get all products
        const products = await Product.find({});
        res.status(200).json(products);
    }  
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async function(req, res){
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }  
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    } 
})

app.post('/product', async (req,res) =>{
    try{
        //await interaction with Database
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

app.put('/product/:id', async function(req, res){
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cant find corresponding product in database
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//delete a product
app.delete('/product/:id', async function(req, res){
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
mongoose.connect('mongodb+srv://naeem:naeem@cluster1.kax9wsm.mongodb.net/NODE-API?retryWrites=true&w=majority')
.then(function (){
    console.log('connected to MongoDB');
    app.listen(3000, function(){
        console.log('NODE API running on port 3000');
    });
}).catch(function(){
    console.log('error');
})