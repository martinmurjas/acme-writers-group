//built-in imports
const axios = require("axios");

//request to get full userlist
const fetchUsers = () => {
  return axios.get("/api/users");
};

//request to add user to users table
const addUser = () => {
  return axios.post("api/users");
};

//request to delete user from users table
const deleteUser = (user) => {
  return axios.delete(`api/users/${user.id}`);
};

//request to get specific user from users table based on user.id
const fetchUser = (user) => {
  return axios.get(`/api/users/${user}`);
};

//request to get all stories from the stories table by a specific user based on user.id
const fetchStories = (user) => {
  return axios.get(`/api/users/${user}/stories`);
};

//request to add a story to the stories table for a specific user
const addStory = (user) => {
  return axios.post(`/api/users/${user}/stories`);
};

//request to delete a specified story from the stories table based on story.id
const deleteStory = (story) => {
  return axios.delete(`api/stories/${story.id}`);
};

//request to toggle a specified story's favorite property (true or false)
const toggleFav = (story) => {
  return axios.put(`api/stories/${story.id}`);
};

export {
  fetchUsers,
  addUser,
  deleteUser,
  fetchUser,
  fetchStories,
  addStory,
  deleteStory,
  toggleFav,
};
