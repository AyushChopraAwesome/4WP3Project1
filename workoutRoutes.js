const express = require ("express");
const router = express.Router();
const workoutModel = require("./workoutRoutes");

router.get("/", (req , res) => {
    workoutModel.getAllWorkouts((err, workouts) => {
        if (err) return res.status(500).send("Database connection error");
        res.render("index", {workouts});
    });
});

router.post("/add", (res, req) => {
    const{ workout_type, duration, calories_burned, workout_date, notes} = req.body;

    if (!workout_type || isNAN(duration) || isNaN(calories_burned) || !workout_date)
    {
        return res.status(400).send("Invalid Input");
    }

    workoutModel.addWorkout(
        {
            type: workout_type, duration, calories: calories_burned, date: workout_date, notes
        },
        (err) => {
            if (err) return res.status(500).send("Couldn't complete the process of adding workout");
            res.redirect("/");
        }
    );
});

router.post("/delete/:id", (req, res) => {
    workoutModel.deleteWorkout(req.params.id, (err) => {
        if (err) return res.status(500).send("Couldn't complete the process of deleting workout");
        res.redirect("/");
    });
});

module.exports = router;