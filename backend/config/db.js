const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;


//the provided code snippet is from the file `kannada-buddy/backend/config/db.js`, which is responsible for establishing a connection to a MongoDB database using Mongoose. The `conenctDB` function attempts to connect to the database using the URI specified in the environment variable `MONGO_URI`. If the connection is successful, it logs a message indicating the host of the connected database. If there is an error during the connection attempt, it logs the error message and exits the process with a failure code. The function is then exported for use in other parts of the application.
// Also, the provided code snippet from `kannada-buddy/backend/controllers/aiController.js` contains two functions: `getTeacherHistory` and `voiceTranslate`.