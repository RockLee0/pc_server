require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());

const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nc7xgzn.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db('pc_parts');
    const productCollection = db.collection('products');
 
 
 
 
    app.get('/products/:id', async (req, res) => {
      const idValue = req.params.id;
      console.log(...idValue);
    
      try {
        const product = await productCollection.findOne({ id:idValue });
        console.log(product);
        if (!product) {
          return res.status(404).send({ status: false, message: 'Product not found' });
        }
    
        res.send({ status: true, data: product });
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send({ status: false, message: 'An error occurred' });
      }
    });



    app.get('/products', async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();
      res.send({ status: true, data: product});
    });


    app.get('/products/:Category', async (req, res) => {
      const propertyValue = req.params.Category;
      
      const cursor = await productCollection.find({ Category: propertyValue});
      const product = await cursor.toArray();
      res.send({ status: true, data: product});
      
    });


  } finally {
  }
};

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
