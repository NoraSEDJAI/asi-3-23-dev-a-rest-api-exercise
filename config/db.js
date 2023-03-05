const mongoose = require ("mongoose")

mongoose.set("strictQuery", true)
const connectDB = async() =>{
  const connexion = await mongoose.connect("mongodb+srv://Nora:Nora2002@clustersedjai.ywa8f9h.mongodb.net/SEDJAI_NORA_API?retryWrites=true&w=majority",{
    useNewUrlParser:true
  })

  console.log(`mongoDb connected:${connexion.connection.host}`)
}


module.exports = connectDB