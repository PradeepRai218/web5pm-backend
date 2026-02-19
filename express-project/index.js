let express = require("express");
let cors=require("cors")

let App = express(); //Server Create

App.use(cors())




let data=[
      {
        title: "Js",
        desc: "Hello",
      },
      {
        title: "React",
        desc: "Hello",
      },
       {
        title: "JHTML",
        desc: "Hello",
      },
       {
        title: "Node",
        desc: "Hello",
      },
    ]

App.use(express.json()) //Json


App.get("/news", (req, res) => {
    console.log(req.query);
    
    let {title}=req.query//Object
    console.log(title);
    

    if(title){
        data=data.filter((obj)=>obj.title.toLowerCase().includes(title.toLowerCase()))
    }
    
  let obj = {
    _status: true,
    _message: "News Found",
    _data: data
  };

  res.send(obj); //Express res.send()
  //Node res.end()
});

App.get("/slider", (req, res) => {
  let obj = {
    _status: true,
    _message: "Slider Found",
    _data: [
      {
        title: "Js",
        desc: "Hello",
      },
      {
        title: "React",
        desc: "Hello",
      },
    ],
  };

  res.send(obj);
});

App.post('/login',(req,res)=>{

   //Object
  console.log(req.body);
  

      let obj = {
        _status: true,
        _message: "Login Done",
       
     };

     res.send(obj)
})



App.get("/product/:pid", (req, res) => {

  console.log(req.params);  //{id:1}
    //Object
    
  let obj = {
    _status: true,
    _message: "Product Found",
   
  };

  res.send(obj); //Express res.send()
  //Node res.end()
});

App.listen("8000", () => {
  console.log("Server Start");
});
