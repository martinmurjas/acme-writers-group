import React from "react";

const Users = ({ users, userId, deleteAUser, addAUser }) => {
  return (
    <div id="users">
      <h2>
        Writers<i onClick={() => addAUser()} className="fa-solid fa-plus"></i>
      </h2>
      <ul>
        <li className={!userId ? "selected" : ""}>
          <a href="#">Users</a>
        </li>
        {users.map((user) => {
          return (
            <li
              className={user.id === userId * 1 ? "selected" : ""}
              key={user.id}
            >
              <a href={`#${user.id}`}>{user.name}</a>
              <i
                onClick={() => deleteAUser(user)}
                className="fa-solid fa-trash"
              ></i>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
