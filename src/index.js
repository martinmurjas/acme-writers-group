//built-in imports
import React, { Component } from "react";
import ReactDom from "react-dom/client";

//local imports
import { fetchUsers, addUser, deleteUser } from "./api";
import Users from "./Components/Users";
import User from "./Components/User";

//App class component
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userId: "",
    };
    this.deleteAUser = this.deleteAUser.bind(this);
    this.addAUser = this.addAUser.bind(this);
  }

  //method to get user list and render at startup
  async componentDidMount() {
    try {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await fetchUsers();
      this.setState({ users: response.data });
      window.addEventListener("hashchange", () => {
        const userId = window.location.hash.slice(1);
        this.setState({ userId });
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  //method to delete selected
  async deleteAUser(user) {
    await deleteUser(user);
    const users = this.state.users.filter((_user) => _user.id !== user.id);
    this.setState({ users });
    if (user.id === this.state.userId * 1) {
      window.location.hash = "";
    }
  }

  //method to add a user
  async addAUser() {
    let newUser = await addUser();
    const users = [...this.state.users, newUser.data];
    this.setState({ users });
  }

  //method to render App
  render() {
    const { users, userId } = this.state;
    const { deleteAUser, addAUser } = this;
    return (
      <React.Fragment>
        <h1>Acme Writers Group ({users.length})</h1>
        <main>
          <Users
            users={users}
            userId={userId}
            deleteAUser={deleteAUser}
            addAUser={addAUser}
          />
          {userId ? (
            <User userId={userId} />
          ) : (
            <div id="userDetails">
              <h2>Select a user for details and story list</h2>
            </div>
          )}
        </main>
      </React.Fragment>
    );
  }
}

//find and get access to the 'main' div
const container = document.querySelector("#root");

//Create a root
const root = ReactDom.createRoot(container);

//Initial render
root.render(<App />);
