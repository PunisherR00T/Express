const express = require('express');
const moment = require('moment');

const app = express()

const port = 4000

var requestTime = function (req, res, next) {
    var d = new Date();
    req.requestTime = d.toLocaleTimeString()
    next();
  };

var check = false


  const HoursRestriction =(req,res,next)=>{
    const now = new Date();
    if (now.getHours()<9 || now.getHours()>19) {check=true}
    
    next()
  }

  const WeekendRestriction=(req,res,next)=>{
    var today = new Date();
    if(today.getDay() == 6 || today.getDay() == 0) 
    {check=true}
    
    console.log(check)
        ;
    
    next()
}
app.use(HoursRestriction)
app.use(WeekendRestriction)
app.use(express.json())


app.get('/test', function (req, res) {
    var responseText = 'Hello World ! ';
    responseText += ' Requested at : ' + req.requestTime + '';
    {check ? res.send(responseText) : '<h2>Return the next day<h2>'}
  });

app.get('/',(req,res)=>{ check ? res.sendFile(__dirname+'/Public/Restriction.html') : 
        res.sendFile(__dirname+'/Public/')

})
app.get('/our-services',(req,res)=>{check ? res.sendFile(__dirname+'/Public/Restriction.html'):
    res.sendFile(__dirname+'/Public/Ourservices.html')
})
app.get('/contact-us',(req,res)=>{check ? res.sendFile(__dirname+'/Public/Restriction.html'):
    res.sendFile(__dirname+'/Public/Contactus.html')
})






app.listen(port,console.log(`Server is running on the port ${port}`))