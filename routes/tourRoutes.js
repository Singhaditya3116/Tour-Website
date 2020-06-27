const express = require("express");
const tourController = require("./../controllers/tourController");

const router = express.Router();


/*router.param("id",(req,res,next,val)=>{ //midlleware specific for id
    console.log(`Tours id is ${val}`);
    next();
})
*/

router.param("id",tourController.checkId); //checking id


router.route("/")
    .get(tourController.getAllTours)
    .post(tourController.checkBody,tourController.createTour)


router.route("/:id")
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports = router;