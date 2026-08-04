const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/database");

const port = Number(process.env.PORT) || 3000;


async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server could not start:", error.message);
    process.exitCode = 1;
  }
}

startServer();
