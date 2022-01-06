const express=require('express');
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profileGet=require('./controllers/profile')
const image=require('./controllers/image')

const db=knex({
  client: 'pg',
  connection: {
     connectionString="postgres://veauardkpvqpzw:177570c9728709f064a82a3f481ee35b4e0f367141d5b798ef90b60d3eea0641@ec2-44-193-228-249.compute-1.amazonaws.com:5432/d28fg11sbng21p"
  ssl: {
    rejectUnauthorized: false,
  },
},
});
const app=express();
app.use(bodyparser.json())
app.use(cors())
app.get('/', (req,res)=>{
	res.send("it is workin")
})
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res)=>{register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res)=>{profileGet.handleProfileGet(req, res, db)})
app.put('/image', (req,res)=>{image.handleImage(req, res, db)})
app.listen(process.env.PORT || 3001,()=>{
  console.log(`app is running in port ${process.env.PORT}`)
})

/*end points we need for the face-detection  front end
/signin POST -->res.send(sucess)
/register POST --> new user
/profile/:user id GET -->user
/image PUT --> this path records the amount of time the user detects a face in an image and also shouws his/her rank
*/