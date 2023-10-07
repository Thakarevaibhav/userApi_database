const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);

  let user = fs.readFileSync("./user.json", "utf-8");
  let userArr = JSON.parse(user);
  // console.log(userArr);


res.writeHead(200,{
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Methods":"PUT,DELETE",
 
})


  if (req.method === "GET" && parsedURL.pathname === "/users" && parsedURL.query.id == null) {
    res.write(user);
    res.end();
  }



  else if (req.method === "GET" && parsedURL.pathname === "/users" && parsedURL.query.id != null) {
    let userId = parsedURL.query.id;

    //console.log(userJSON);
    let singleuser = userArr.find((ele) => {
      return ele.id === Number(userId);
    });

    if (singleuser != undefined) {
      res.write(JSON.stringify(singleuser));
      //res.end();
    }
    else {
      res.write(JSON.stringify("Invalid user id"));
      //res.end();
    }
    res.end();
  }



  else if (req.method === "DELETE" && parsedURL.pathname === "/users" && parsedURL.query.id != null) {
    let userindex = userArr.findIndex((ele, index) => {
      return ele.id == Number(parsedURL.query.id);
    });

    if (userindex !== -1) {
      userArr.splice(userindex, 1);
      fs.writeFileSync("user.json", JSON.stringify(userArr));
      //res.write(JSON.stringify({ success:true , message:"Deleted Sucessfully!!"}));
      res.write(JSON.stringify(" User Deleted Sucessfully!!!"))
      res.end();
    }
    else {
      // res.write("user not found!");
      res.end();
    }
  }



  else if (req.method === "POST" && parsedURL.pathname === "/users") {

    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    })

    req.on("end", () => {

      let newUser = JSON.parse(data);
      userArr.push(newUser);

      fs.writeFileSync("user.json", JSON.stringify(userArr))
      res.write(JSON.stringify("User Added Sucessfully!!"));
      res.end();

    })
  }




  else if (req.method === "PUT" && parsedURL.pathname === "/users" && parsedURL.query.id != null) {

    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    })

    req.on("end", () => {



      let userObj = JSON.parse(data);

      let userIndex = userArr.findIndex((ele, index) => {
        return ele.id == Number(parsedURL.query.id);
      });
      // console.log(userIndex.data)
      if (userIndex !== 1) {
        userArr[userIndex] = userObj;
        fs.writeFileSync("user.json", JSON.stringify(userArr));

        res.write(JSON.stringify("Updated Sucessfully!!"));
        res.end();
      }


      else {
        res.write("user not found!");
        res.end();
      }
      // fs.writeFileSync("user.json",JSON.stringify(userArr))
      // res.write("User added sucessfully!!");
      // res.end();

    })
  }


  else if (req.method === "PATCH" && parsedURL.pathname === "/users" && parsedURL.query.id != null) {

    let data = "";
    req.on("data", (chunk) => {
      data += chunk;

    })
    req.on("end", () => {

      let userObj = JSON.parse(data);

      let userIndex = userArr.findIndex((ele, index) => {
        return ele.id == Number(parsedURL.query.id);
      });
    

      if(userIndex!==undefined){
        if (userObj.age !== undefined) {
          userArr[userIndex].age = userObj.age;
          fs.writeFileSync("user.json",JSON.stringify(userArr))
          res.write("User added sucessfully!!");
          res.end();
        }
        else if(userObj.firstname!==undefined){
          userArr[userIndex].firstname=userObj.firstname;
          fs.writeFileSync("user.json",JSON.stringify(userArr))
          res.write("User added sucessfully!!");
          res.end();
        }
        else if(userObj.phone!==undefined){
          userArr[userIndex].phone=userObj.phone;
          fs.writeFileSync("user.json",JSON.stringify(userArr))
          res.write("User added sucessfully!!");
          res.end();
        }
        else{
          res.write("User not found!!");
          res.end();
        }
       
      }
      else{
        res.write("User error!!");
        res.end();
      }
    })
  }


  else {
    res.write("please provide valid request method");
    // if(req.method!="GET"){
    //     res.write("please provide valid request method");
    // }
    // else{
    //     res.write("please provide valid rout");
    // }
    res.end();
  }
});

server.listen(8000, () => {
  console.log("server is runnig");
});








