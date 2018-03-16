var express = require('express');
var router = express.Router();
var _ = require('underscore');
const db = require('../db');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{message:''});
});

router.get('/register',(req,res) =>{
    console.log('Called');
    res.render('form')
});

router.get('/details',(req,res) =>{
    db.Customers.findAll().then((data) =>{
        global.data = data;
        res.render('details');
    });

});

router.post('/save',(req,res) =>{
    console.log('Post Method called',req.body.firstname);
    db.Customers.create({
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        email:req.body.email
    }).then((newUser) =>{
      global.newUser = newUser;
      res.redirect('/details');
    }).catch(err =>{
      console.log('Unable to save data..!!',err);
    });
});

router.put('/update/:id',(req,res) => {
    db.Customers.update(
        {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email
        },
        {
            where: {id: req.params.id}
        }
    ).then(user => {
        console.log('Updated Records', user);
    });
    res.redirect('/details')
});

router.get('/edit/:id',(req,res) =>{

    let result = _.find(global.data,function(obj){
        console.log('Tested',obj.dataValues.id,req.params.id);
        return obj.dataValues.id === parseInt(req.params.id);
    });
    res.render('edit',{resultObj:result.dataValues});
});

router.get('/delete/:id',(req,res) =>{
   db.Customers.destroy({
       where:{
           id:req.params.id
       }
   }).then(user =>{
       console.log('User',user);
       res.redirect('/details')
   })
});
module.exports = router;
