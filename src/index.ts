import App from "./app";
import UserRoute from "./routes/user.route";
import 'dotenv/config'
import SavingPlanRoute from "./routes/saving-plan.route";
const app = new App([
    new UserRoute(),
    new SavingPlanRoute()
])

app.listen()