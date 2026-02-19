let http = require("http");

let server = http.createServer((req, res) => {

    console.log(req);
    

  if (req.url == "/") { //http://localhost:8000/
    let obj = {
      _status: true,
      _message: "Data Found",
      _data: [
        {
          id: 1,
          title: "Iphone",
        },
        {
          id: 1,
          title: "Mi",
        },
      ],
    };

    res.end(JSON.stringify(obj));
  }

  if(req.url=="/news"){ //http://localhost:8000/news
     let obj = {
      _status: true,
      _message: "News Data Found",
      _data: [
        {
          id: 1,
          title: "Iphone",
        },
        {
          id: 1,
          title: "Mi",
        },
      ],
    };

    res.end(JSON.stringify(obj));
  }

  if(req.url=="/product" && req.method=="POST"){ //http://localhost:8000/product
     let obj = {
      _status: true,
      _message: "Product Data Found",
      _data: [
        {
          id: 1,
          title: "Iphone",
        },
        {
          id: 1,
          title: "Mi",
        },
      ],
    };

    res.end(JSON.stringify(obj));
  }


});

//Start

server.listen("8000", () => {
  console.log("Server Start");
}); //http://localhost:8000
