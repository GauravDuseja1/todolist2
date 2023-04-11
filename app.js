const express=require('express');
// const router = express.Router();
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
// var item="";
app.use(express.static("public"));
let items=["Buy Food","Cook Food","Eat Food"];
let workItems=[];

// const bodyParser=require("body-parser");
//view engine goes to bydeafault a golder views and search a file to render
app.set("view engine","ejs");
// module.exports = router ;

    // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let today=new Date();
    let  options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    let day=today.toLocaleDateString("en-US",options);
    app.get("/",function(req,res){
        res.render("list",{
            listTitle:day,
            newListItem:items
        })
    })
    
    
       

    app.post("/",function(req,res){
        // item=req.body.newItem;
        // console.log(req.body)
        let item=req.body.newItem;
        if(req.body.list=="Work")
        {
            workItems.push(item);
            res.redirect("/work");
        }else
        {
            items.push(item);
            res.redirect("/");

        }
        
        // console.log(item);
        // res.render("list",{newListItem:item});
    });

    // *********************************************
    // var currentDay=today.getDay();
    // var day=weekday[currentDay];
    // res.write("<h1>Yay it's a weekwnd</h1>");
    // res.write("<p>Hurrah!!</p>");   
    // res.send();
    // res.render('list',{kindOfDay:day});
    // day="Weekday";
    // res.render('list',{kindOfDay:day});
    // **************************************************
    
    app.get("/work",function(req,res){
        res.render("list",{listTitle:"Work list",newListItem:workItems});
    })
    app.post("/work",function(req,res){
        let item=req.body.newItem;
        workItems.push(item);
        res.redirect("/work");
    })
app.listen(3000,function(){
    console.log("Server started on port 3000");
})