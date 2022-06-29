//built-in imports
import React, { Component } from "react";

//local imports
import {
  fetchUser,
  fetchStories,
  addStory,
  deleteStory,
  toggleFav,
} from "../api";

//User class component
class User extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      stories: [],
    };
    this.addAStory = this.addAStory.bind(this);
    this.deleteAStory = this.deleteAStory.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  //method to call getUserAndStories method at startup
  async componentDidMount() {
    this.getUserAndStories();
  }

  //method call getUserAndStories method when userId is changed
  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUserAndStories();
    }
  }

  //method to fetch user/story data and update state
  async getUserAndStories() {
    const [user, stories] = await Promise.all([
      fetchUser(this.props.userId),
      fetchStories(this.props.userId),
    ]);
    this.setState({ user: user.data });
    this.setState({ stories: stories.data });
  }

  //method to add a story to the selected user
  async addAStory() {
    await addStory(this.props.userId);
    const storyList = await fetchStories(this.props.userId);
    this.setState({ stories: storyList.data });
  }

  //method to delete a specific story from user
  async deleteAStory(story) {
    await deleteStory(story);
    const stories = this.state.stories.filter(
      (_story) => _story.id !== story.id
    );
    this.setState({ stories });
  }

  //method to toggle the story favorite property
  async toggleFavorite(story) {
    await toggleFav(story);

    //re-fetches story list since changing fav impacts sorting which is done on backend
    const storyList = await fetchStories(this.props.userId);
    this.setState({ stories: storyList.data });
  }

  //method to render User on page
  render() {
    const { user, stories } = this.state;
    const { addAStory, deleteAStory, toggleFavorite } = this;
    return (
      <div id="userDetails">
        <h2>
          {user.name}
          <i onClick={() => addAStory()} className="fa-solid fa-plus"></i>
        </h2>
        <p>{user.bio}</p>
        {stories.map((story) => {
          return (
            <div key={story.id}>
              <div>
                <h3>
                  {story.title}
                  <i
                    onClick={() => toggleFavorite(story)}
                    className={`fa-solid fa-heart ${
                      story.favorite ? "favorite" : ""
                    }`}
                  ></i>
                  <i
                    onClick={() => deleteAStory(story)}
                    className="fa-solid fa-trash"
                  ></i>
                </h3>
              </div>
              <p>{story.body}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default User;
