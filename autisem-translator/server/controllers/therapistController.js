const associationService = require('../services/associationService');
const therapistService = require('../services/therapistService');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

async function registerTherapist(req, res) {
  try {
    const { userName, firstName, lastName, phoneNumber, password, listOfPatients } = req.body;
    await therapistService.createTherapist(userName, firstName, lastName, phoneNumber, password, listOfPatients);
    //what happens after 1 hour
    const token = jwt.sign({ userName }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ message: 'Therapist registered successfully' ,token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function getTherapistDetailes(req, res) {
  try {
    // Extract the user information from the token in the request header
    const decodedToken = req.user;
    console.log("getTherapistDetailes",decodedToken)
    const { userName } = decodedToken;
    const therapistDetails = await therapistService.getTherapist(userName);
    res.status(200).json({ message: 'Therapist details retrieved successfully', therapistDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getTherapistPatients(req, res) {
  try {
    const therapistId = req.params.therapistId;
    const patients = await associationService.getListOfPatientsByTherapistID(
      therapistId
    );
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function create(req, res) {
  try {
    const { therapistId, patientUsername } = req.body;
    const association = await associationService.createAssociation(therapistId, patientUsername)
    if(association!=null){
      res.status(201).json(association);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function remove(req, res) {
  try {
    const { therapistID, patientID } = req.query;
    const association = await associationService.removeAssociation(therapistID, patientID)
    if(association!=null){
      res.status(201).json(association);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  registerTherapist,
  getTherapistDetailes,
  getTherapistPatients,
  remove,
  create
};