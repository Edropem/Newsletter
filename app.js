const express=require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,

                }



            }
        ]
    }
    const jsonData = JSON.stringify(data);
    
    const url = "https://us4.api.mailchimp.com/3.0/lists/1e71939983"

    const options = {
        method: "POST",
        auth: "pedro:b227619f0a1cd46712c08b65dee82746",
    }

    const request = https.request(url, options, function(response){
        
        if (response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }else {
                res.sendFile(__dirname + "/failure.html");
            }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 4000, function(){
    console.log("Server running on port 4000");
    
});


//API KEY b227619f0a1cd46712c08b65dee82746-us4
// Audience ID 1e71939983
