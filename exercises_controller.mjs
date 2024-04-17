import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';
import { checkSchema, validationResult } from 'express-validator';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', 
        checkSchema({
            name: {notEmpty: true, isLength: {options: {min: 1}}, isString: true}, 
            reps: {notEmpty: true, isInt: true, isInt: {options: {gt: 0}}}, 
            weight: {notEmpty: true, isInt: true, isInt: {options: {gt: 0}}},
            unit: {notEmpty: true, isString: true},
            date: {notEmpty: true, custom: {options: isDateValid}}
            }),
        (req, res) => {
            const result = validationResult(req);
            if (result.isEmpty()){
            exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(exercise => {
                res.status(201).json(exercise);
            });
    
            } else{
                res.status(400).json({ Error: 'Invalid request'});
            };
});

/**
 * Retrive the movie corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseID = req.params._id;
    exercises.findExerciseByID(exerciseID)
        .then(exercise => {
            if (exercise !== null){
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found'});
            }

        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed'});
        })
});


app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercise(filter)
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed'});
        })
});


app.put('/exercises/:_id', 
    checkSchema({
    name: {notEmpty: true, isLength: {options: {min: 1}}, isString: true}, 
    reps: {notEmpty: true, isInt: true, isInt: {options: {gt: 0}}}, 
    weight: {notEmpty: true, isInt: true, isInt: {options: {gt: 0}}},
    unit: {notEmpty: true, isString: true},
    date: {notEmpty: true, custom: {options: isDateValid}}
    }),(req, res) => {
        const result = validationResult(req);
            if (result.isEmpty()){
        exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(modifiedCount => {
            if (modifiedCount === 1){
                res.status(200).json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else {
                res.status(404).json({ Error: 'Not found'});
            }
        })} else{
            res.status(400).json({ Error: 'Invalid Request'});
        };
});


app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1){
                res.status(204).send();
            } else{
                res.status(404).json({ Error: 'Not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed'})
        })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});