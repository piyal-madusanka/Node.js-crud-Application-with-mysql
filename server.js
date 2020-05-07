var express=require('express');
var http=require('http');
var mysql=require('mysql');
var app=express();
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));


app.set('view engine','ejs');


const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"drive"
});
const siteTitle="Simple Application";

app.get('/index',(req,res)=>{
    con.query("SELECT * FROM user",(err,result)=>{
        res.render('pages/index',{
        item:result
        });
    });
     


});
app.post('/updateuser',(req,res)=>{
    var id=req.body.id;
    console.log(id);
    con.query("SELECT * FROM user WHERE id = '"+id+"' ",(err,result)=>{
        res.render('pages/update',{
        item:result
        });
        
    });
     
});
app.post('/deleteuser',(req,res)=>{
    var id=req.body.id;
    console.log(id);
    con.query("DELETE FROM user WHERE id = '"+id+"' ",(err,result)=>{
        if (err) throw err;
        res.redirect("http://localhost:4000/index");
        
    });
     


});
app.get('/adduser',(req,res)=>{
    res.render('pages/add',{
      
        });


});
app.post('/addnewuser',(req,res)=>{
var name=req.body.name;
var pwd=req.body.pwd;
if( pwd !="" && name !=""){
var sql = "INSERT INTO user (username,password ) VALUES ('"+name+"', '"+pwd+"')";
con.query(sql,  (err, result)=> {
  if (err) throw err;
   res.redirect("http://localhost:4000/index");
});
}else{
    res.redirect("http://localhost:4000/index");
}

});

app.post('/updateusernow',(req,res)=>{
    var id=req.body.id;
    var name=req.body.name;
    var pwd=req.body.pwd;


     var sql = "UPDATE user SET username = '"+name+"' , password='"+pwd+"' WHERE id = '"+id+"' ";    
    
    con.query(sql,  (err, result)=> {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
       res.redirect("http://localhost:4000/index");
       res.end();
    });
   
    
    });



var server=app.listen(4000,()=>{
    
    console.log('server started at port 4000..............')
})