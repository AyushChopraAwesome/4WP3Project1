const express = require("express");
const router = express.Router();
const workoutModel = require("./workoutModel");


router.get("/", (req, res) => {
    workoutModel.getAllWorkouts((err, workouts) => {
        if (err) {
            console.error("Error fetching workouts:", err.message);
            return res.status(500).send("Database error. ");
        }
        res.render("index", { workouts });
    });
});

router.post("/add", (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        console.warn("No form data received in request.");
        return res.status(400).send("Error: No form data received.");
    }

    const { workout_type, duration, calories_burned, workout_date, notes } = req.body;


    if (!workout_type || !duration || !calories_burned || !workout_date) {
        console.warn("⚠️ Missing required fields in request body.");
        return res.status(400).send("Error: Missing required workout details.");
    }

    workoutModel.addWorkout(
        { type: workout_type, duration, calories: calories_burned, date: workout_date, notes },
        (err) => {
            if (err) {
                console.error("Failed to add workout:", err.message);
                return res.status(500).send("Failed to add workout. Please try again later.");
            }
            console.log("Workout added successfully.");
            res.redirect("/");
        }
    );
});

router.post("/delete/:id", (req, res) => {
    const workoutId = req.params.id;

    if (!workoutId) {
        console.warn("Delete request received without an ID.");
        return res.status(400).send("Error: Workout ID is required.");
    }

    workoutModel.deleteWorkout(workoutId, (err) => {
        if (err) {
            console.error("Failed to delete workout:", err.message);
            return res.status(500).send("Failed to delete workout. Please try again later.");
        }
        console.log(`Workout with ID ${workoutId} deleted successfully.`);
        res.redirect("/");
    });
});

module.exports = router;
