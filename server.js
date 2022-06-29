//built-in imports
const express = require("express");
const path = require("path");

//local imports
const { User, Story } = require("./db");
const { createRandomUser, createRandomStory } = require("./seed-data");

//creating the express app
const app = express();

//routes to host static files
app.use("/dist", express.static("dist"));
app.use("/assets", express.static("assets"));

//route to delete users -- also deletes all stories associated with the userId
app.delete("/api/users/:id", async (req, res, next) => {
  try {
    await Story.destroy({
      where: {
        userId: req.params.id,
      },
    });
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//route to create a new user
app.post("/api/users", async (req, res, next) => {
  try {
    const newUser = await createRandomUser();
    res.status(201).send(await User.create(newUser));
  } catch (err) {
    next(err);
  }
});

//route to update a story's favorite flag
app.put("/api/stories/:id", async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);
    await story.set({
      favorite: !story.favorite,
    });
    await story.save();
    res.status(200).send(story.favorite);
  } catch (err) {
    next(err);
  }
});

//route to delete a story
app.delete("/api/stories/:id", async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);
    await story.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//route to create a new story for a specific user
app.post("/api/users/:id/stories", async (req, res, next) => {
  try {
    const newStory = await createRandomStory();
    newStory.userId = req.params.id;
    res.status(201).send(await Story.create(newStory));
  } catch (err) {
    next(err);
  }
});

//route to get list of users
app.get("/api/users", async (req, res, next) => {
  try {
    res.send(
      await User.findAll({
        attributes: {
          exclude: ["bio"],
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

//route to get user details
app.get("/api/users/:id", async (req, res, next) => {
  try {
    res.send(await User.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

//route to get stories by userId
app.get("/api/users/:id/stories", async (req, res, next) => {
  try {
    const stories = await Story.findAll({
      where: {
        userId: req.params.id,
      },
      order: [["favorite", "DESC"], ["id"]],
    });
    res.send(stories);
  } catch (ex) {
    next(ex);
  }
});

//initial get request route => Sending back index.html file
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
