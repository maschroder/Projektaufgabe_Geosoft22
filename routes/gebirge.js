var express = require('express');
var router = express.Router();

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017"); // localhost == 127.0.0.1
const dbName = "Projektaufgabe";
const collectionName = "gebirge";

/* GET Mountains. */
router.get('/', async function(req, res, next) {
  //TODO
  await client.connect();
  console.log("client connected for get-request");
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  pois = await collection.find({}).toArray((err, result) => {
    if (err) {console.log(err); res.send("");}

    let markerArray = JSON.stringify(result)
    res.send(`
      {
        "type": "FeatureCollection",
        "features":${markerArray}
      }`
    );
  })
});



router.post('/', async function(req, res) {
  await client.connect();
  console.log("client connected for post-request");
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  if(req.body.name == '' || req.body.lat == '' || req.body.lng == '' || req.body.hoehe == '' || req.body.beschreibung == '' || req.body.url == ''){
    console.log("insufficient parameters. redirecting");
    res.redirect("/create");
  } else{
    //TODO: gebirge object ersetllen
    let gebirge = {
      type: "Feature",
      properties:{
        shape: "Marker",
        name: req.body.name,
        hoehe: req.body.hoehe,
        beschreibung: req.body.beschreibung,
        url: req.body.url
      },
      geometry:{
        type: "Point",
        coordinates:[req.body.lng,req.body.lat]
      }
    }

    //NOTE: not sure yet if InsertedID is the name of the id attribute
    let inserted = await collection.insertOne(gebirge);
    console.log(inserted)
    insertedID = inserted.insertedId.toString();
    res.redirect(`/?id=${insertedID}`)
  }
});



router.delete('/', async function(req, res, next) {
  console.log(req.body)

  await client.connect();
  console.log("client connected for delete-request");
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  //delete each
  for(id of req.body.ids){
    let objid = ObjectId(id)
    collection.deleteOne({"_id": objid})
  }

  //send redirect link
  res.send("/edit")
});

module.exports = router;
