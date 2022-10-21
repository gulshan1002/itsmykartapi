const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/itsmykart";

const bodyParser = require("body-parser");
const { response } = require("express");
const { json } = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect(url,(err, db)=>
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Database Created!");
    }
    db.close();
});
MongoClient.connect(url,(err,db)=>
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        const dbo = db.db("itsmykart");
        dbo.createCollection("record",(err,res)=>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("Collection Created!");
            }
            db.close();
        });
    }
});
app.get("/",(req,res)=>
{
    res.send("Hello World!");
});
app.get("/api/student",(req,res)=>
{
    MongoClient.connect(url, (err,db)=>
    {
        if(err)
        {
            console.log(err);
        }
        const dbo = db.db("itsmykart");
        dbo.collection("record").find().toArray((err,result)=>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(result);
                res.send(result);
            }
            db.close();
        });
    });
});
app.get("/api/student/:id",(req,res)=>
{
    let {id} = req.params;
    console.log(id);
    MongoClient.connect(url,(err,db)=>
    {
        if(err)
        {
            console.log(err);
        }
        const dbo = db.db("itsmykart");
        dbo.collection("record").findOne({id:id},(err,result)=>
        {
            if(err)
            {
                console.log(err);
            }
            else if(result==null)
            {
                res.send("No Record Found!");
            }
            else
            {
                console.log(result);
                res.send(result);
            }
            db.close();
        });
    });
});
app.post("/api/student",(req,res)=>
{
    let flag=0;
    MongoClient.connect(url,(err,db)=>
    {
        if(err)
        {
            console.log(err);
        }
        const dbo = db.db("itsmykart");
        let obj = {id:req.body.id,name:req.body.name,clas:req.body.class,sec:req.body.sec};
        dbo.collection("record").insertOne(obj,(err,result)=>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("1 Document Inserted!");
                res.send(result);

            }
            db.close();
        });
    });
});
app.put("/api/student/:id",(req,res)=>
{
    let id = req.params.id;
    console.log(id);
    let query={id:id}
    MongoClient.connect(url,(err,db)=>
    {
        if(err)
        {
            console.log(err);
        }
        const dbo = db.db("itsmykart");
        let obj = {$set:{id:req.body.id,name:req.body.name,clas:req.body.class,sec:req.body.sec}};
        dbo.collection("record").updateOne(query,obj,(err,result)=>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("1 Document Updated!");
                res.send(result);

            }
            db.close();
        });
    });
});
app.delete("/api/student/:id",(req,res)=>
{
    let {id} = req.params;
    MongoClient.connect(url,(err,db)=>
    {
        if(err)
        {
            console.log(err);
        }
        const dbo = db.db("itsmykart");
        dbo.collection("record").deleteOne({id:id},(err,result)=>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("1 Document Deleted!");
                res.send(result);

            }
            db.close();
        });
    });
});
app.listen(PORT, (err)=>
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(`server is listening on port ${PORT}`);
    }
});