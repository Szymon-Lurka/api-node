import express from 'express';
import {
    addTour, checkBody,
    checkID,
    deleteTour,
    getAllTours,
    getOneTour,
    updateTour
} from "../../controllers/tours/tour-controller.js";
const router = express.Router();

router.param('id', checkID);

router
    .route('/')
    .get(getAllTours)
    .post(checkBody, addTour);
router
    .route('/:id')
    .get(getOneTour)
    .delete(deleteTour)
    .patch(updateTour);

export default router;
