const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
.then(() => {
    console.log("connected to DB");
})
.catch( (err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
} 

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "653fbf8374a8aba24cc15a5e"}));
    await Listing.insertMany(initData.data);//inserting data from data.js file
    console.log("data was initialized");
}

initDB();//calling initDB function