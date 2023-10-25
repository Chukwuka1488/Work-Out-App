const mongoose = require('mongoose');
const Workout = require('./workoutModel'); // Make sure to replace 'path_to_your_model' with the actual path to your model file

const MONGO_URI = 'mongodb+srv://Onyema_07:Onyema_07@testcluster1.6edzl.mongodb.net/your_database_name'; // Replace 'your_database_name' if needed

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ... (rest of the script remains unchanged)
// Seed Data
const seedWorkouts = [
    { title: "Push-ups", reps: 15, load: 0 },
    { title: "Squats", reps: 20, load: 0 },
    { title: "Lunges", reps: 10, load: 15 },
    { title: "Bench Press", reps: 8, load: 70 },
    { title: "Deadlift", reps: 6, load: 100 },
    { title: "Pull-ups", reps: 12, load: 0 },
    { title: "Bicep Curls", reps: 15, load: 15 },
    { title: "Tricep Dips", reps: 15, load: 0 },
    { title: "Leg Press", reps: 10, load: 80 },
    { title: "Shoulder Press", reps: 10, load: 30 },
    { title: "Lat Pulldown", reps: 12, load: 40 },
    { title: "Sit-ups", reps: 20, load: 0 },
    { title: "Leg Curls", reps: 10, load: 40 },
    { title: "Leg Extensions", reps: 10, load: 40 },
    { title: "Dumbbell Flys", reps: 12, load: 20 },
    { title: "Face Pulls", reps: 15, load: 20 },
    { title: "Plank", reps: 1, load: 60 }, // Assuming load is time in seconds for plank
    { title: "Burpees", reps: 15, load: 0 },
    { title: "Mountain Climbers", reps: 20, load: 0 }
  ];
  
  // Seed the data
  Workout.insertMany(seedWorkouts)
    .then(() => {
      console.log('Data Seeded!');
      mongoose.connection.close(); // Close the connection after seeding
    })
    .catch((error) => {
      console.error('Error seeding data: ', error);
    });
