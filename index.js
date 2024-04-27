const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://apponarts:hNPA6dOz7vr5Q3Ju@cluster0.4bvpsnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const allArt = client.db("AllArtDB").collection("Arts");

        app.get("/allart", async (req, res) => {
            const cursor = allArt.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post("/allart", async (req, res) => {
            const allarts = req.body;
            console.log(allarts);
            const result = await allArt.insertOne(allarts);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
