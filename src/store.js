const { createStore } = require("redux");
import rootReducer from "./reducer"
const store=createStore(rootReducer);
export default store;