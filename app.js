const express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members:[
             {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]

    };

    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/16bf7ed1be";

    const options = {
        method: "POST",
        auth: "marta1:b03aea59948beea75057659d3c60ca72-us1"

    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/succeess.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
        request.write(jsonData);
        request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});




// API Key:
// boardEventb03aea59948beea75057659d3c60ca72-us1


// LIST ID
// 16bf7ed1be