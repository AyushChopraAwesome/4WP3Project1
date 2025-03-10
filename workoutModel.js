const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "workouts.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to database:", dbPath);
    }
});

const workoutModel = {
    getAllWorkouts: (cb) => {
        const sql = "SELECT * FROM Workouts ORDER BY workout_date DESC";
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error("Error fetching workouts:", err.message);
                return cb(err, null);
            }
            cb(null, rows);
        });
    },

    addWorkout: (data, cb) => {
        if (!data.type || !data.duration || !data.calories || !data.date) {
            return cb(new Error("Missing required workout fields."), null);
        }

        const sql = `
            INSERT INTO Workouts (workout_type, duration, calories_burned, workout_date, notes) 
            VALUES (?, ?, ?, ?, ?)`;
        const params = [data.type, data.duration, data.calories, data.date, data.notes || ""];

        db.run(sql, params, function (err) {
            if (err) {
                console.error("Error adding workout:", err.message);
                return cb(err);
            }
            console.log("Workout added successfully with ID:", this.lastID);
            cb(null, { id: this.lastID });
        });
    },

    deleteWorkout: (workoutId, cb) => {
        if (!workoutId) {
            return cb(new Error("Workout ID is required for deletion."));
        }

        const sql = "DELETE FROM Workouts WHERE id=?";
        db.run(sql, [workoutId], function (err) {
            if (err) {
                console.error("Error deleting workout:", err.message);
                return cb(err);
            }

            if (this.changes === 0) {
                return cb(new Error("Workout not found."), null);
            }

            console.log("Workout deleted successfully:", workoutId);
            cb(null, { deletedId: workoutId });
        });
    }
};

module.exports = workoutModel;
