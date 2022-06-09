import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import AdminVehicle from "../views/Admin/Vehicle.vue";
import AdminBooking from "../views/Admin/Booking.vue";
import AdminBookingCreate from "../views/Admin/BookingCreate.vue";
import AdminVehicleCreate from "../views/Admin/VehicleCreate.vue";

import AgreingBooking from "../views/Agreing/Booking.vue";

import EmployeeBooking from "../views/Employee/Booking.vue";

import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { guest: true }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { guest: true }
  },
  {
    path: "/admin/bookings/:id",
    name: "admin-booking",
    component: AdminBooking,
  },
  {
    path: "/admin/bookings/create",
    name: "admin-booking-create",
    component: AdminBookingCreate,
  },
  {
    path: "/admin/vehicles",
    name: "admin-vehicle",
    component: AdminVehicle,
  },
  {
    path: "/admin/vehicles/create",
    name: "admin-vehicle-create",
    component: AdminVehicleCreate,
  },
  {
    path: "/agreing/bookings/:id",
    name: "agreing-booking",
    component: AgreingBooking,
  },
  {
    path: "/emp/bookings/:id",
    name: "emp-booking",
    component: EmployeeBooking,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
