const express = require("express"); 
const bodyPars = require("body-parser"); // to parse post request body
const cors = require("cors"); // accept cross client request
//const path = require('path')
//const multer = require("multer");
//const upload = multer({dest:'uploads/'});
let schema = require("./schema"); 
let {nstore} = schema;
const app = express();

// using middle ware for parse and cross request
app.use(bodyPars());
//app.use(express.static('uploads'))
// only allowing cros fom my site
app.use( cors({
    }));
app.post("/sl",(req,res)=>{
    const body = req.body;
    nstore.findOne({brand:body.brand,product:body.product,unit:body.unit,price:body.price},(err,example)=>{
    	if(example)
    	{
    		res.write("duplicate")
    		res.end();
    	}
    	else
    	{
    		let val = new nstore({      // fitting request to menu schema
	        brand:body.brand,
	        product:body.product,
	        price:body.price,
			unit:body.unit,
			productImage: body.productImage
	    	});
	    	val.save().then(doc=>{   // saving new item to  mongoose
	        res.write("sucess");
	        res.end();
	    }) 
    	}
    })  // copying request body
});
app.post("/dl",(req,res)=>{
    const body = req.body;
    d=nstore.find({brand:body.brand,product:body.product,unit:body.unit,price:body.price}).remove().exec(); 
});
app.get("/gl",(req,res)=>{
    nstore.find({},{__v:0,_id:0},(err,val)=>{ //request all data from menu collection
        res.send(val)  
    })
});
app.get("/", (req, res, next) => {
	nstore.find()
	  .select("brand product unit price productImage")
	  .exec()
	  .then(docs => {
		const response = {
		  count: docs.length,
		  products: docs.map(doc => {
			return {
			  brand: doc.name,
			  product: doc.product,
			  productImage: doc.productImage,
			  request: {
				type: "GET",
				url: "http://localhost:3000/" + doc.productImage
			  }
			};
		  })
		};
		//   if (docs.length >= 0) {
		res.status(200).json(response);
		//   } else {
		//       res.status(404).json({
		//           message: 'No entries found'
		//       });
		//   }
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("server started lisening in port 3000.....");
})
