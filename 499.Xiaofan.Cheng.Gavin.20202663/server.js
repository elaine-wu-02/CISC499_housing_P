const express = require('express');
const path = require('path');
const http = require ('http');
const fs = require('fs');

const app = express();
const publicPath=path.join(__dirname);

var mysql = require('mysql');
var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'cxf20020425',
  database: "cisc499"
});



// sendFile will go here
//app.use(express.static(publicPath));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.listen(80);

app.get('/Furnitures.html', function (req, res, next) {

  fs.readFile('./Furnitures.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(80);
  });

});  

app.post('/Furnitures.html', function (req, res, next) {
    var PID=req.body.PID;
    var Furniture_name1=req.body.Furniture_name1;
    var Furniture_name2=req.body.Furniture_name2;
    var Furniture_name3=req.body.Furniture_name3;
    var Furniture_name4=req.body.Furniture_name4;
    var Furniture_name5=req.body.Furniture_name5;
    var Furniture_name6=req.body.Furniture_name6;
    var Furniture_name7=req.body.Furniture_name7;
    var Furniture_name8=req.body.Furniture_name8;
    var Furniture_name9=req.body.Furniture_name9;
    var Furniture_name10=req.body.Furniture_name10;

    
    console.log("Furnitures post PID: "+PID);
    console.log("Furnitures post Furniture_name1: "+Furniture_name1);
    console.log("Furnitures post Furniture_name2: "+Furniture_name2);
    console.log("Furnitures post Furniture_name3: "+Furniture_name3);
    console.log("Furnitures post Furniture_name4: "+Furniture_name4);
    console.log("Furnitures post Furniture_name5: "+Furniture_name5);
    console.log("Furnitures post Furniture_name6: "+Furniture_name6);
    console.log("Furnitures post Furniture_name7: "+Furniture_name7);
    console.log("Furnitures post Furniture_name8: "+Furniture_name8);
    console.log("Furnitures post Furniture_name9: "+Furniture_name9);
    console.log("Furnitures post Furniture_name10: "+Furniture_name10);
    
    var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name1+ "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('Furnitures record added sucessfully');
      }
    });

    if (Furniture_name2) {
      var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name2+ "')";
      console.log(sql);
      connection.query(sql, (err) =>{
         if (err) {
           console,log(err);  
         }
         else {
           console.log('Furnitures record added sucessfully');
         }
       });
   }

    if (Furniture_name3) {
       var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name3+ "')";
       console.log(sql);
       connection.query(sql, (err) =>{
          if (err) {
            console,log(err);  
          }
          else {
            console.log('Furnitures record added sucessfully');
          }
        });
    }

    if (Furniture_name4) {
      var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name4+ "')";
      console.log(sql);
      connection.query(sql, (err) =>{
         if (err) {
           console,log(err);  
         }
         else {
           console.log('Furnitures record added sucessfully');
         }
       });
   }

   if (Furniture_name5) {
    var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name5+ "')";
    console.log(sql);
    connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
       else {
         console.log('Furnitures record added sucessfully');
       }
     });
 }

 if (Furniture_name6) {
  var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name6+ "')";
  console.log(sql);
  connection.query(sql, (err) =>{
     if (err) {
       console,log(err);  
     }
     else {
       console.log('Furnitures record added sucessfully');
     }
   });
}

if (Furniture_name7) {
  var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name7+ "')";
  console.log(sql);
  connection.query(sql, (err) =>{
     if (err) {
       console,log(err);  
     }
     else {
       console.log('Furnitures record added sucessfully');
     }
   });
}

if (Furniture_name8) {
  var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name8+ "')";
  console.log(sql);
  connection.query(sql, (err) =>{
     if (err) {
       console,log(err);  
     }
     else {
       console.log('Furnitures record added sucessfully');
     }
   });
}

if (Furniture_name9) {
  var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name9+ "')";
  console.log(sql);
  connection.query(sql, (err) =>{
     if (err) {
       console,log(err);  
     }
     else {
       console.log('Furnitures record added sucessfully');
     }
   });
}

if (Furniture_name10) {
  var sql = "INSERT INTO Furnitures (PID,Furniture_name) values ('" + PID +"','"+ Furniture_name10+ "')";
  console.log(sql);
  connection.query(sql, (err) =>{
     if (err) {
       console,log(err);  
     }
     else {
       console.log('Furnitures record added sucessfully');
     }
   });
}
    
  });


  app.get('/manage.html', function (req, res, next) {

  //  fs.readFile('./manage.html', function (err, html) {
  //    if (err) {
  //        throw err; 
  //    }       
      http.createServer(function(request, response) {  
  //        response.writeHeader(200, {"Content-Type": "text/html"});  
  //        response.write(html);  
  //        response.end();  
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<h1>Update Manaager Info</h1><br /><br />');
          res.end();
              
        }).listen(80);
    //  });

  });  


  app.post('/manage.html', function (req, res, next) {
    var PID=req.body.PID;
    var Phoneno=req.body.Phoneno;
    var StartYear=req.body.StartYear;
    var EndDate=req.body.EndDate;

    
    console.log("manage post PID: "+PID);
    console.log("manage post Phoneno: "+Phoneno);
    console.log("manage post StartYear: "+StartYear);
    console.log("manage post EndDate: "+EndDate);

    var sql = "INSERT INTO manage (PID,PhoneNumber,StartYear,EndDate) values ('" + PID +"','"+ Phoneno + "','" + StartYear +"','"+ EndDate+ "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('manage record added sucessfully');
      }
    });
    
  });

  app.get('/manager.html', function (req, res, next) {

      http.createServer(function(request, response) {  
          //        response.writeHeader(200, {"Content-Type": "text/html"});  
          //        response.write(html);  
          //        response.end();  
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Update Manaager Info</h1>');
        res.end();
            
      });

  });  


  app.post('/manager.html', function (req, res, next) {
    var fname=req.body.fname;
    var lname=req.body.lname;
    var Phoneno=req.body.Phoneno;

    
    console.log("manager post fname: "+fname);
    console.log("manager post lname: "+lname);
    console.log("manager post Phoneno: "+Phoneno);

    var sql = "INSERT INTO manager (PhoneNumber,Fname,Lname) values ('" + Phoneno +"','"+ fname + "','" + lname+ "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('manager record added sucessfully');
      }
    });

    
  });


  app.get('/own.html', function (req, res, next) {

    fs.readFile('./own.html', function (err, html) {
      if (err) {
          throw err; 
      }       
      http.createServer(function(request, response) {  
          response.writeHeader(200, {"Content-Type": "text/html"});  
          response.write(html);  
          response.end();  
      }).listen(8000);
    });
  
  });  

  app.post('/own.html', function (req, res, next) {
    var OID=req.body.OID;
    var PID=req.body.PID;

    
    console.log("own post OID: "+OID);
    console.log("own post PID: "+PID);

    var sql = "INSERT INTO own (OID,PID) values ('" + OID +"','"+ PID + "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('own record added sucessfully');
      }
    });
    
  });


  app.get('/ownerinfoinput.html', function (req, res, next) {

    fs.readFile('./ownerinfoinput.html', function (err, html) {
      if (err) {
          throw err; 
      }       
      http.createServer(function(request, response) {  
          response.writeHeader(200, {"Content-Type": "text/html"});  
          response.write(html);  
          response.end();  
      }).listen(8000);
    });
  
  });  

  app.post('/ownerinfoinput.html', function (req, res, next) {
    var OID=req.body.OID;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var Phoneno=req.body.Phoneno;
    var Address=req.body.Address;

    
    console.log("ownerinfoinput post OID: "+OID);
    console.log("ownerinfoinput post fname: "+fname);
    console.log("ownerinfoinput post lname: "+lname);
    console.log("ownerinfoinput post Phoneno: "+Phoneno);
    console.log("ownerinfoinput post Address: "+Address);
    
    var sql = "INSERT INTO ownr (OID,Fname,Lname,PhoneNo,Adress) values ('" + OID +"','"+ fname+"','"+ lname+"','"+ Phoneno+"','"+ Address + "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('ownr record added sucessfully');
      }
    });
    
  
  });


  app.get('/picture_files.html', function (req, res, next) {

    fs.readFile('./picture_files.html', function (err, html) {
      if (err) {
          throw err; 
      }       
      http.createServer(function(request, response) {  
          response.writeHeader(200, {"Content-Type": "text/html"});  
          response.write(html);  
          response.end();  
      }).listen(8000);
    });
  
  });  

  app.post('/picture_files.html', function (req, res, next) {
    var PID=req.body.PID;
    var File_name1=req.body.File_name1;
    var File_name2=req.body.File_name2;
    var File_name3=req.body.File_name3;
    var File_name4=req.body.File_name4;
    var File_name5=req.body.File_name5;
    var File_name6=req.body.File_name6;
    var File_name7=req.body.File_name7;
    var File_name8=req.body.File_name8;
    var File_name9=req.body.File_name9;
    var File_name10=req.body.File_name10;
    
    console.log("picture_files post PID: "+PID);
    console.log("picture_files post File_name1: "+File_name1);
    console.log("picture_files post File_name2: "+File_name2);
    console.log("picture_files post File_name3: "+File_name3);
    console.log("picture_files post File_name4: "+File_name4);
    console.log("picture_files post File_name5: "+File_name5);
    console.log("picture_files post File_name6: "+File_name6);
    console.log("picture_files post File_name7: "+File_name7);
    console.log("picture_files post File_name8: "+File_name8);
    console.log("picture_files post File_name9: "+File_name9);
    console.log("picture_files post File_name10: "+File_name10);

    var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name1 + "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('Picturee_files record added sucessfully');
      }
    });

    if (File_name2) {
      var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name2 + "')";
      console.log(sql);
      connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
        else {
         console.log('Picturee_files record added sucessfully');
       }
     });
    }

    if (File_name3) {
      var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name3 + "')";
      console.log(sql);
      connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
        else {
         console.log('Picturee_files record added sucessfully');
       }
     });
    }

    if (File_name4) {
      var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name4 + "')";
      console.log(sql);
      connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
        else {
         console.log('Picturee_files record added sucessfully');
       }
     });
    }

    if (File_name5) {
      var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name5 + "')";
      console.log(sql);
      connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
        else {
         console.log('Picturee_files record added sucessfully');
       }
     });
    }

    if (File_name6) {
      var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name6 + "')";
      console.log(sql);
      connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
        else {
         console.log('Picturee_files record added sucessfully');
       }
     });
    }

    if (File_name7) {
      var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name7 + "')";
      console.log(sql);
      connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
        else {
         console.log('Picturee_files record added sucessfully');
       }
     });
    }

    if (File_name8) {
      var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name8 + "')";
      console.log(sql);
      connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
        else {
         console.log('Picturee_files record added sucessfully');
       }
     });
    }

    if (File_name9) {
      var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name9 + "')";
      console.log(sql);
      connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
        else {
         console.log('Picturee_files record added sucessfully');
       }
     });
    }

    if (File_name10) {
      var sql = "INSERT INTO Picturee_files (PID,File_name) values ('" + PID +"','"+ File_name10 + "')";
      console.log(sql);
      connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
        else {
         console.log('Picturee_files record added sucessfully');
       }
     });
    }

  });

  app.get('/propertyinfoinput.html', function (req, res, next) {

    fs.readFile('./propertyinfoinput.html', function (err, html) {
      if (err) {
          throw err; 
      }       
      http.createServer(function(request, response) {  
          response.writeHeader(200, {"Content-Type": "text/html"});  
          response.write(html);  
          response.end();  
      }).listen(8000);
    });
  
  });  

  app.post('/propertyinfoinput.html', function (req, res, next) {
    var housename=req.body.housename;
    var Address=req.body.Address;
    var housetype=req.body.housetype;
    var monthlyrent=req.body.monthlyrent;
    var bedroom=req.body.bedroom;
    var bathroom=req.body.bathroom;
    var parking=req.body.parking;
    var laundry=req.body.laundry;
    var fencedyard=req.body.fencedyard;
    var detached=req.body.detached;
    var floor=req.body.floor;
    var elevator=req.body.elevator;
    var numberofpeople=req.body.numberofpeople;
    var privatekitchen=req.body.privatekitchen;
    var datelisted=req.body.datelisted;
    
    console.log("propertyinfoinput post housename: "+housename);
    console.log("propertyinfoinput post Address: "+Address);
    console.log("propertyinfoinput post housetype: "+housetype);
    console.log("propertyinfoinput post monthlyrent: "+monthlyrent);
    console.log("propertyinfoinput post bedroom: "+bedroom);
    console.log("propertyinfoinput post bathroom: "+bathroom);
    console.log("propertyinfoinput post parking: "+parking);
    console.log("propertyinfoinput post laundry: "+laundry);
    console.log("propertyinfoinput post fencedyard: "+fencedyard);
    console.log("propertyinfoinput post detached: "+detached);
    console.log("propertyinfoinput post floor: "+floor);
    console.log("propertyinfoinput post elevator: "+elevator);
    console.log("propertyinfoinput post numberofpeople: "+numberofpeople);
    console.log("propertyinfoinput post privatekitchen: "+privatekitchen);
    console.log("propertyinfoinput post datelisted: "+datelisted);
    
    var sql = "INSERT INTO property (house_name,Address, house_type,Monthly_rent,bedroom,bathroom,parking,laundry,fenced_yard,Detached,floor,elevator,number_of_people,private_Kitchen,date_listed) values ('" 
    + housename +"','"+ Address+"','"+ housetype+
    "','"+ monthlyrent+"','"+ bedroom+"','"+ bathroom+"',"+ parking+",'"+ laundry+"',"+ fencedyard+",'"+
    detached+"','"+ floor+"',"+ elevator+",'"+ numberofpeople+"',"+ privatekitchen+",'"+ datelisted + "')";
    
    console.log(sql);
    connection.query(sql, (err) =>{
       if (err) {
         console,log(err);  
       }
       else {
         console.log('property record added sucessfully');
       }
     });


  });

console.log('Server started at http://localhost:' + publicPath);



