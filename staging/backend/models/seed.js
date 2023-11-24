require('dotenv').config()
const mongoose = require('mongoose');
const Workout = require('./workoutModel'); // Replace with the path to your model file

const MONGO_URI = process.env.MONGO_URI;
console.log("checking", MONGO_URI)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed Data
const seedWorkouts = [
    { title: "Push-ups", reps: 15, load: 0 },
    { title: "Squats", reps: 20, load: 0 },
    { title: "Lunges", reps: 10, load: 15 },
    { title: "Bench Press", reps: 8, load: 70 },
    { title: "Deadlift", reps: 6, load: 100 }
];

// Function to insert workouts one by one
async function seedData() {
  for (let workout of seedWorkouts) {
    let newWorkout = new Workout(workout);
    await newWorkout.save();
    console.log(`Data Seeded for workout: ${workout.title}`);
  }
  
  mongoose.connection.close(); // Close the connection after seeding
}

// Call the function to start seeding
seedData().catch((error) => {
  console.error('Error seeding data: ', error);
});
