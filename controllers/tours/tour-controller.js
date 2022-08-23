import fs from "fs";
import { getDirname } from "../../utils/get-dirname.js";

const tours = JSON.parse(fs.readFileSync(`${ getDirname() }/../dev-data/data/tours-simple.json`, 'utf-8'));

export const checkID = (req, res, next, val) => {
    if (val > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next();
}

export const checkBody = (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'You need to provide name and price!'
        })
    }
    next();
}

export const addTour = (req, res) => {
    const newID = tours[tours.length - 1].id + 1;
    const newTour = { ...req.body, id: newID };
    tours.push(newTour);
    fs.writeFile(`${ getDirname() }/../../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).send({
            status: 'success',
            data: {
                newTour
            }
        });
    });
};

export const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
}

export const getOneTour = (req, res) => {
    const id = req.params['id'];
    const tour = tours.find((tour) => tour.id == id);
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}


export const deleteTour = (req, res) => {
    const id = req.params['id'];
    const index = tours.findIndex((tour) => tour.id == id);
    tours.splice(index, 1);
    fs.writeFile(`${ getDirname() }/../../dev-data/data/tours-simple.json`, JSON.stringify(tours), () => {
        res.status(204).json({
            status: 'success',
            data: null
        })
    })
}

export const updateTour = (req, res) => {
    const id = req.params['id'];
    const index = tours.findIndex((tour) => tour.id == id);
    const data = req.body;
    tours[index] = { ...tours[index], ...data };
    const tour = tours[index];
    fs.writeFile(`${ getDirname() }/../dev-data/data/tours-simple.json`, JSON.stringify(tours), () => {
        res.status(204).json({
            status: 'success',
            data: {
                tour
            }
        })
    })
}
