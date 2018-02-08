import axios from "axios";

export default {
  // Gets all outlets
  getOutlets: function() {
    return axios.get("/api/outlets");
  },
  // Gets the outlet with the given id
  getOutlet: function(id) {
    return axios.get("/api/outlets/" + id);
  },
  // Deletes the outlet with the given id
  deleteOutlet: function(id) {
    return axios.delete("/api/outlets/" + id);
  },
  // Saves a outlet to the database
  saveOutlet: function(outletData) {
    return axios.post("/api/outlets", outletData);
  }
};
