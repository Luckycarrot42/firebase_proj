const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors') 
const app = express();
app.use(cors({ origin: true}));

app.get ('/beers', async (req, res) => {
  const beers = await admin.firestore().collection('beers').get()
  const list = []
  beers.docs.forEach(doc => {
    list.push({
      id: doc.id,
      data: doc.data()
    })
  })
  res.send(list)
})

app.get('/beers/:id', async (req, res) => {
  const beer = await admin.firestore().collection('beers')
  .doc(req.params.id).get().then((doc) => {
    if(doc.exists) {
      return {
        id: doc.id,
        data: doc.data()
      }
    }else{
      return {}
    }
  })
  res.send(beer)
})

//crear cervezas
app.post('/beers', async (req,res) => {
  const beer = await admin.firestore().collection('beers').add(req.body)
  .then((doc) => {
    return doc.id
  })
  res.send(beer)
})

app.delete('/beers/:id', async (req, res) => {
  const beer = await admin.firestore().collection('beers')
  .doc(req.params.id).delete().then(function() {
    // File deleted successfully
  }).catch(function(error) {
    // Uh-oh, an error occurred!
    console.log(error)
  });
  res.send(beer)
})

app.put('/beers/:id', async (req, res) => {
  const beer = await admin.firestore().collection('beers')
  .doc(req.params.id).update(req.body).then(function (doc) {
    return doc.id
  })
  res.send(beer)
})

exports.api = functions.https.onRequest(app)