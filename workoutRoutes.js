const express = require("express");
const router = express.Router();
const workoutModel = require("./workoutModel"); 


router.get("/", (req, res) => {
    workoutModel.getAllWorkouts((err, workouts) => {
        if (err) {
            return res.status(500).send("Database error.");
        }
        res.render("index", { workouts: workouts });
    });
});


router.post("/add", (req, res) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send("Error: No form data received.");
    }

    const { workout_type, duration, calories_burned, workout_date, notes } = req.body;

    workoutModel.addWorkout(
        { type: workout_type, duration, calories: calories_burned, date: workout_date, notes },
        (err) => {
            if (err) {
                return res.status(500).send("Failed to add workout.");
            }
            res.redirect("/");
        }
    );
});

router.post("/delete/:id", (req, res) => {
    const workoutId = req.params.id;

    workoutModel.deleteWorkout(workoutId, (err) => {
        if (err) {
            return res.status(500).send("Failed to delete workout.");
        }
        res.redirect("/");
    });
});

module.exports = router;
