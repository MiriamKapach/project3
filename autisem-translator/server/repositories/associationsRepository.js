const mongoose = require('mongoose');
const Associations = require("../models/associations");
const Therapist = require("../models/therapist");

async function createAssociation(therapistID, patientID) {
  try {
    const newAssociation = new Associations({
      therapistId: therapistID,
      patientId: patientID,
       status: "Confirmed",
    });
    await newAssociation.save();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating association" };
  }
}

async function removeAssociation(therapistID, patientID) {
  try {
    const result = await Associations.findOneAndDelete({ therapistId: therapistID, patientId: patientID });
    if (!result) {
      // No document found matching the criteria
      return { success: false, message: "Association not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error removing association:", error.message);
    return { success: false, message: "Error removing association" };
  }
}


async function getListOfPatientsByTherapistID(therapistID, status) {
  try {
    const query = status
      ? { therapistId: therapistID, status: status }
      : { therapistId: therapistID };
    const associations = await Associations.find(query).populate("patientId");

    return associations.map((association) => ({
      patientDetails: association.patientId,
      status: association.status,
    }));
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error getting associations by therapistID",
    };
  }
}



module.exports = {
  createAssociation,
  removeAssociation,
  getListOfPatientsByTherapistID,
};
