const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "workouts.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database:", dbPath);
    }
});

const workoutModel = {
    getAllWorkouts: (callback) => {
        db.all("SELECT * FROM Workouts ORDER BY workout_date DESC", [], callback);
    },
    addWorkout: (workout, callback) => {
        db.run(
            "INSERT INTO Workouts (workout_type, duration, calories_burned, workout_date, notes) VALUES (?, ?, ?, ?)",
            [workout.type, workout.duration, workout.calories, workout.date, workout.notes],
            callback
        );
    },
    deleteWorkout: (id, callback) => {
        db.run("DELETE FROM Workouts WHERE id=?", [id], callback);
    }
};

module.exports = workoutModel;
