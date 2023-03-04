import App from "./app";
import UserRoute from "./routes/user.route";
import 'dotenv/config'
const app = new App([
    new UserRoute()
])

app.listen()