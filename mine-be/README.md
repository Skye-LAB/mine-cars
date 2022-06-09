# Mine Cars

Pertama, jalankan `yarn install`

Jalankan server dengan `yarn start-server`

Endpoint: `http://localhost:5000`

## User Endpoint

Endpoint yang tersedia untuk `user`.

| Usage    | Endpoint           | Method | Field |
| :---:    | :------:           | :----: | :---: |
| Create   | `/api/users/`      | POST   | `{ username, email, password, role }` |
| Login    | `/api/users/login` | POST   | `{ email, password }` |
| Find One | `/api/users/:id`   | GET    | `{ header: { auth-token }, params: { id } }` |
| Find All | `/api/users/`      | GET    | `{ header: { auth-token, role: 2 } }` |

## Vehicle Endpoint

Endpoint yang tersedia untuk `vehicle`.

| Usage    | Endpoint           | Method | Field |
| :---:    | :------:           | :----: | :---: |
| Create   | `/api/vehicles/`   | POST   | `{ header: { auth-token }, plat, jenis, merk }` |
| Find All | `/api/vehicles`    | GET    | `{ header: { auth-token, role: 2 }, email, password }` |

## Booking Endpoint

Endpoint yang tersedia untuk `booking`.

| Usage    | Endpoint           | Method | Field |
| :---:    | :------:           | :----: | :---: |
| Create   | `/api/bookings/`   | POST   | `{ header: { auth-token, role: 2 }, employee, agreing, vehicle, tglPinjam, tglKembali }` |
| Find All | `/api/bookings`    | GET    | `{ header: { auth-token, role: 2 } }` |
| Show Agreing | `/api/bookings/agreing/:id` | GET | `{ header: { auth-token, role: 1 }, params: { agreingId } }` |
| Update Agreing | `/api/bookings/agreing/:id` | POST | `{ header: { auth-token. role: 1 }, params: { agreingId }, id, status: 1 }` |
| Show Employee | `/api/bookings/emp/:id` | GET | `{ header: { auth-token }, params: { empId } }`

## Usage Endpoint

Endpoint yang tersedia untuk `usage`.

| Usage    | Endpoint           | Method | Field |
| :---:    | :------:           | :----: | :---: |
| Update   | `/api/usages/`     | POST   | `{ header: { auth-token, role: 2 }, bbm, jarakTotal, serviceHari, serviceTerakhir }` |
