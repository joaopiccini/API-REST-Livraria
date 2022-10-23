import mongoose from "mongoose";

const uri = "mongodb+srv://alura:alura@clusteralura.4afg4gs.mongodb.net/alura-node"
mongoose.connect(uri);
const db = mongoose.connection;

export default db;