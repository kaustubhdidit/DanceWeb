const express=require("express")            //importing the module
const path=require("path");
const app=express();                        //created an express app
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port=80; 

// // Define Mongoose Schema
const contactScheme = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    query: String
  });

  const Contact = mongoose.model('Contact', contactScheme);  // Finalizing the Schema

// Express specific stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded());
// app.use(express.urlencoded({ extended: true }))

//  Pug specific stuff
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Endpoints
app.get('/',(req,res)=>{
    const param={};
    res.status(200).render('home.pug',param);
})

// When someone hits a Get request in contact

app.get('/contact',(req,res)=>{
    const param={};
    res.status(201).render('contact.pug',param);
})

// When someone hits a Post request in contact

app.post('/contact',(req,res)=>{                    
    var myData=new Contact(req.body); // Creating a new contact object
    myData.save().then(()=>{            // saves amd returns a promise
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });    
    // res.status(201).render('contact.pug');                
})

// Start the server

app.listen(port,()=>{                       // listens the request
    console.log(`The application started successfully on port ${port}`)
})