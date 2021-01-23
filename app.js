const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const ejs = require("ejs");

const aboutContent="This site make you artis. You can decorating your home like professional artis. This pictures inspired you. Nothing else can be better like have a beautiful home. We like design and you like us.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
});

app.get("/about", function(req, res){
 res.render("about", {aboutContent: aboutContent});	
});

app.get("/bedroom", function(req, res){
 res.render("bedroom");	
});

app.get("/bathroom", function(req, res){
 res.render("bathroom");	
});
app.get("/living-room", function(req, res){
 res.render("living-room");	
});
app.get("/contact", function(req, res){

    const url="https://nominatim.openstreetmap.org/search?q=zagreb%2C+Ulica+Đure+Basaričeka+22"

	https.get(url,function(response){
      console.log(response.statusCode);
	}); 

 res.render("contact");	
});

app.post("/", function(req, res){

	const email = req.body.email;
	
	const data = {
		members: [ 
		{ email_address: email,
		  status: "subscribed"
		}
		]
	};

	const jsonData = JSON.stringify(data);

	const url = "https:us17.api.mailchimp.com/3.0/lists/98b804f018";
	const options = {
		method: "POST",
		auth: "ana:383c8930215a96e07fad14325e467e3e-us17"
	}

	const request = https.request(url, options, function(response){
		response.on("data", function(data){
			console.log(JSON.parse(data));
		})
      })
    
    request.write(jsonData);
    request.end();

});

app.listen(3000, function(req, res) {
	console.log("radiiiii");
});

