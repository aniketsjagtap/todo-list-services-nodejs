var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require('url');
fsExists = require('fs-exists')


var cors=require('cors');

router.use(cors({origin:true,credentials: true}));


/* GET users listing. */
router.get('/', function(req, res, next) {
  fsExists(__dirname + "../../../" + "items.json",function(err,result){
    console.log(result);
    if(result){
      console.log ("the entry exists");
      //res.send('respond with a resource');
        fs.readFile( __dirname + "../../../" + "items.json", 'utf8', function (err, data) {
          console.log( data );
        res.end( data );
          
       });
    }else
      {
        console.log ("the entry does not exist");
        fs.open(__dirname + "../../../" + "items.json","w",function(err,rs){
          if(err) throw err;
          if(rs){
            console.log("File Created!!");
            data = [{"name":"abc","price":150}];
            fs.writeFile( __dirname + "../../../" + "items.json", JSON.stringify(data), function (err, data) {
              if (err) throw err;
              console.log('item added!');
            });
            res.end(JSON.stringify(data));
          }
         

        })
    }
  });
  
});


var item = '{"name":"abc","price":150}';

router.put('/addItem', function (req, res) {
  console.log(req.headers.origin);
  var q = url.parse(req.url, true);
 // console.log(q);
  item = req.body;
  // First read existing users.
  fs.readFile( __dirname + "../../../" + "items.json", 'utf8', function (err, data) {
   
    data = JSON.parse( data );
    console.log(item);
    
   // item = JSON.parse(item);
   // console.log(item);
    data.push(item);
    console.log(data);
    fs.writeFile( __dirname + "../../../" + "items.json", JSON.stringify(data), function (err, data) {
      if (err) throw err;
      console.log('item added!');
    });
   
    res.end( JSON.stringify(data));
  });
})

router.get('/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     var users = JSON.parse( data );
     var user = users["user" + req.params.id] 
     console.log( user );
     res.end( JSON.stringify(user));
  });
})

var id = 2;
router.delete('/deleteItem', function (req, res) {
  console.log (req.body);
  var q = url.parse(req.url, true);
  var id = q.query.id;

  // First read existing users.
  fs.readFile( __dirname + "../../../" + "items.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data.splice(id,1);
      // delete data["user" + 2];
      
      console.log( data );

      fs.writeFile( __dirname + "../../../" + "items.json", JSON.stringify(data), function (err, data) {
        if (err) throw err;
        console.log('Updated!');
      });

      res.end( JSON.stringify(data));
  });
})

module.exports = router;
