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
     connectionString:process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
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

NODE_TLS_REJECT_UNAUTHORIZED=0
*/