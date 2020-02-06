require('dotenv/config');
const axios = require('axios').default;

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
  });


//GET
export async function GetAllVehicles() {
    return api.get('/vehicles');
}

export async function FindVehicle(id) {

    return api.get('/vehicles/' + id);
}

export async function GetChassis() {

    return api.get('/chassis/');
}

export async function GetVehicleByChassis(id) {
    return api.get('/vehicles/chassis/' + id);
}

//POST
export async function InsertVehicle(vehicleData) {
    return api.post('/vehicles', vehicleData);
}

export async function InsertChassis(chassisData) {
    return api.post('/chassis', chassisData);
}

//PUT
export async function UpdateVehicle(vehicleData) {
    return api.put('/vehicles/' + vehicleData.id, vehicleData);
}

//DELETE
export async function DeleteVehicle(id) {
    return api.delete('/vehicles/' + id);
}

export async function DeleteChassis(id) {
    return api.delete('/chassis/' + id);
}