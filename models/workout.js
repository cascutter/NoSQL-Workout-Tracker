const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const workoutSchema = new Schema({
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [{
            type: {
                type: String,
                trim: true,
                required: "Exercise Type"
            },
            name: {
                type: String,
                trim: true,
                required: "Exercise Name"
            },
            duration: {
                type: Number,
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }]
    },
    // Includes virtual properties
    {
        toJSON: {
            virtuals: true
        }
    }
);
// Adds dynamically created property to schema
workoutSchema.virtual("totalDuration").get(function() {
    // Gives array of exercises as just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;