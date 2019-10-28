const fs = require('fs').promises

const stockEnv = "SECRET=youShouldReallyChangeThis\nAPI_KEY=https://home.openweathermap.org/users/sign_up"
const checkForDotenv = async function() {
  try {
    // check if a .env exists already,
    await fs.readFile('.env')
  } catch (err) {
    // then create one if there's an error reading the file
    await fs.writeFile('.env', stockEnv)
      .catch(console.error)
  }
}

checkForDotenv()
