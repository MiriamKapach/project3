
const Patient = require("../models/patient");
const associationRepository = require("../repositories/associationsRepository");

const associationService = {
  async createAssociation(therapistID, patientUsername) {
    const patientId = await Patient.findOne({ userName: patientUsername }).select('_id');
    if (patientId === null) {
      return null;
    }
    return associationRepository.createAssociation(therapistID, patientId)
  },
  async removeAssociation(therapistID, patientID) {
    return associationRepository.removeAssociation(therapistID, patientID)
  },
  async getListOfPatientsByTherapistID(therapistID) {
    return associationRepository.getListOfPatientsByTherapistID(therapistID);
  },
}

module.exports = associationService;
