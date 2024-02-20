import axios from "axios";
import { MMKV } from 'react-native-mmkv';
import { REACT_APP_BASE_URL } from '@env';

const storage = new MMKV();

const TherapistService = {
  createTherapist: async (therapist) => {
    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}/therapists/register`, therapist);
      const { token } = response.data;
      console.log("token", token);
      storage.set('token', token);
      return token;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  getTherapistDetails: async (userName) => {
    try {
      const storedToken = storage.getString('token');
      console.log("storedToken", storedToken);
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/therapists/get`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
        {
          params: {
            userName,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Get therapist details error:', error);
      throw error;
    }
  },
  
  getTherapistPatients: async (therapistId) => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/therapists/${therapistId}/patients`);
      return response.data;
    } catch (error) {
      console.error('Error fetching therapist patients:', error);
      throw new Error('Error fetching therapist patients');
    }
  },
  associatePatient: async (therapistId, patientUsername) => {
    try {
      console.log("associatePatient",therapistId, patientUsername)
      const response = await axios.post(`${REACT_APP_BASE_URL}/therapists/create`, {
        therapistId: therapistId,
        patientUsername: patientUsername
        });
      if (response.data.message == 'Patient not found') {
        return 'no such patient'
      }
      return response.data;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Error sending notification');
    }
  },
  unAssociatePatient: async (therapistId, patientId) => {
    try {
      const response = await axios.delete(`${REACT_APP_BASE_URL}/therapists?therapistID=${therapistId}&patientID=${patientId}`);
      if (response.data.success != true) {
        return 'failed'
      }
      else {
        return true
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Error sending notification');
    }
  },
};

export default TherapistService;