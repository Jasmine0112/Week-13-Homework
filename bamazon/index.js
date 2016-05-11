	var mysql = require("mysql");
	var prompt = require("prompt");

	console.log("-----------------------------")
	console.log("Welcome to MyStore")
	console.log("-----------------------------")


	var connection=mysql.createConnection({
	host: 'localhost',
	user:'root',
	password:'Ibrahim02',
	database:'mystore'



	})

	connection.connect(function(err){

	if(err){
		console.log("Error connecting");
		return;
	}


	connection.query("SELECT * from products",function(err,result){

	//console.log(result)

	console.log(result.length+" items available.")


	for(i=0;i<result.length;i++){
		console.log("------------------------------------------------------------");
		console.log(result[i].ItemID+"       "+result[i].ProductName+"      $"+result[i].Price+"            "+result[i].StockQuantity);
		console.log("------------------------------------------------------------");
	}


	console.log("What would you like to purchase?");

	prompt.get(['ItemID','Quantity'],function(err,res){

		// console.log("You asked for "+res.ItemID)

		// console.log("You asked for "+res.Quantity)

		// connection.query("SELECT * FROM products WHERE ItemID="+res.ItemID+" AND StockQuantity>"+res.Quantity);

		var checkProductSQL = "SELECT * FROM products WHERE ItemID="+res.ItemID+" AND StockQuantity >= "+res.Quantity;

		connection.query(checkProductSQL, function(err, res2){


	//		console.log(err);
	if(res2.length>0){



		console.log("Item is in stock "+res.ItemID);
		console.log("Your total is");


	 	connection.query("SELECT * FROM products WHERE ItemID="+res.ItemID, function(err, res3){

	 		var finalPrice = res3[0].Price * res.Quantity;
	 console.log("$"+finalPrice+" we will ship your order in 24 hours. Thank you.");
	 		var currentStockQuantity = res3[0].StockQuantity;
	 		var newStockQuantity = currentStockQuantity - res.Quantity;

	 		connection.query("UPDATE products SET StockQuantity="+newStockQuantity+" WHERE ItemID="+res.ItemID, function(err, res4){

	 				if(!err){
	 					console.log("Order successful!");
	 					showInventory();
	 					

	 				}

	 		});


		 });





	}else{
		console.log("Insufficient Quantity");
		return;
	}



		})

	})

});

	})






var showInventory = function(){


	connection.query("SELECT * from products",function(err,result){

	//console.log(result)

	console.log(result.length+" items available.")


	for(i=0;i<result.length;i++){
		console.log("------------------------------------------------------------");
		console.log(result[i].ItemID+"       "+result[i].ProductName+"      $"+result[i].Price+"            "+result[i].StockQuantity);
		console.log("------------------------------------------------------------");
	}

});


}
