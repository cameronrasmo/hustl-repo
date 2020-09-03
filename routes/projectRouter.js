const express = require("express");
const Project = require("../models/project.js");
const Task = require("../models/task.js");

const projectRouter = express.Router();

const colors = [
    ["#3a3648", "#754d4d"],
    ["#6D7655", "#51467C"],
    ["#5A5576", "#46737C"],
    ["#765555", "#7B467C"],
    ["#5C9D9A", "#988A67"],
    ["#975862", "#BD8874"],
    ["#977E58", "#77A67F"],
];

projectRouter.route("/:userID/all").get((req, res, next) => {
    Project.find({ user: req.params.userID }, (err, found) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        res.status(200).send(found);
    });
});

projectRouter
    .route("/:projectID")
    .get((req, res, next) => {
        Project.findOne({ _id: req.params.projectID }, (err, found) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(found);
        });
    })
    .put((req, res, next) => {
        Project.findOneAndUpdate(
            { _id: req.params.projectID },
            req.body,
            { new: true },
            (err, updated) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                res.status(201).send(updated);
            }
        );
    })
    .delete((req, res, next) => {
        Project.findOneAndDelete(
            { _id: req.params.projectID },
            (err, deleted) => {
                Task.deleteMany(
                    { project: req.params.projectID },
                    (err, deleted) => {
                        if (err) {
                            res.status(500);
                            return next(err);
                        }
                    }
                );
                if (err) {
                    res.status(500);
                    return next(err);
                }
                res.status(204).send(deleted);
            }
        );
    });

projectRouter.route("/finished/:projectID").put((req, res, next) => {
    Project.findOneAndUpdate(
        { _id: req.params.projectID },
        { finished: true },
        { new: true },
        (err, updated) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(201).send(updated);
        }
    );
});

projectRouter.route("/:userID").post((req, res, next) => {
    const newProject = new Project(req.body);
    newProject.user = req.params.userID;
    newProject.color = colors[Math.floor(Math.random() * colors.length)];
    newProject.save((err, saved) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        res.status(201).send(saved);
    });
});

module.exports = projectRouter;
