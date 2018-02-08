import axios from "axios";

export default {
  // Gets all topics
  getTopics: function() {
    return axios.get("/api/topics");
  },
  // Gets the topic with the given id
  getTopic: function(id) {
    return axios.get("/api/topics/" + id);
  },
  // Deletes the topic with the given id
  deleteTopic: function(id) {
    return axios.delete("/api/topics/" + id);
  },
  // Saves a topic to the database
  saveTopic: function(topicData) {
    return axios.post("/api/topics", topicData);
  }
};
