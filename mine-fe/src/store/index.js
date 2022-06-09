import { createStore } from "vuex";

import users from "./modules/users";
import bookings from "./modules/booking";
import vehicles from "./modules/vehicle";

export default createStore({
  modules: {
    users,
    bookings,
    vehicles
  },
});
