import App from "./app";
import UserRoute from "./routes/user.route";
import 'dotenv/config'
import SavingPlanRoute from "./routes/saving-plan.route";
import SavingsGroupRoute from "./routes/savings-group.route";
const app = new App([
    new UserRoute(),
    new SavingPlanRoute(),
    new SavingsGroupRoute()
])

app.listen()