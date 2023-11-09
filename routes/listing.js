const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isOwner, isLoggedIn,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isOwner, isLoggedIn, wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// Index Route
// router.get("/", wrapAsync(listingController.index));


 
//Show Route
// router.get("/:id", wrapAsync(listingController.showListing));


//Create route
// router.post("/", isLoggedIn,validateListing, wrapAsync(listingController.createListing));

//Update Route
// router.put("/:id", isOwner, isLoggedIn, validateListing, wrapAsync(listingController.updateListing));

//Delete Route
// router.delete("/:id", isOwner, isLoggedIn, wrapAsync(listingController.destroyListing));

module.exports = router;



//Writing Schema validation as middleware
//writen same in create route 1st and passing validateListing as middleware


// For Create Route
//400 is bad req from client side
// if(!req.body.listing) {
//     throw new ExpressError(400, "Send Valid Data for Listings");
// }

//using JOI
// let result = listingSchema.validate(req.body);
// console.log(result);
// if(result.error) {
//     throw new ExpressError(400, result.error);
// }
 // let {title, descrtiption, image, price, country, location} = req.body;
        // let listing = req.body.listing;
             //using above is javascript object we can make it to model/instance by parsing 
             //below is converted into model ke document ke ander aur model ke instance ke ander
        // let result = listingSchema.validate(req.body);
        // console.log(result);


//to perform update operation two routes need to be created i.e Edit and Update route(using GET edit and PUT req on submit)



//For Update Route
    //no need to write in if since we are using joi and passing as middleware validateListing
    // if(!req.body.listing) {
    //     throw new ExpressError(400, "Send Valid Data for Listings");
    // }
    

