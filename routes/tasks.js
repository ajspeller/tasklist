var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ajspeller1:ajspeller1@ds217351.mlab.com:17351/tasklist_aj', ['tasks']);

// get all tasks
router.get('/tasks', function (req, res, next) {
  db.tasks.find(function (err, tasks) {
    if (err) {
      res.send(err)
    } else {
      res.json(tasks);
    }
  });
});

// get a single task
router.get('/task/:id', function (req, res, next) {
  const taskId = {
    _id: mongojs.ObjectId(req.params.id)
  };
  db.tasks.findOne(taskId, function (err, task) {
    if (err) {
      res.send(err)
    } else {
      res.json(task);
    }
  });
});

// save a task
router.post('/task', function (req, res, next) {
  var task = req.body;
  if (!task.title) {
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.tasks.save(task, function (err, task) {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

// delete a task
router.delete('/task/:id', function (req, res, next) {
  const taskId = {
    _id: mongojs.ObjectId(req.params.id)
  };
  db.tasks.remove(taskId, function (err, task) {
    if (err) {
      res.send(err)
    } else {
      res.json(task);
    }
  });
});


// update a task
router.put('/task/:id', function (req, res, next) {
  var task = req.body;
  var updatedTask = {};

  if (task.title) {
    updatedTask.title = task.title;
  }
  if (task.isDone) {
    updatedTask.isDone = task.isDone;
  }

  if (!updatedTask) {
    res.status(400)
    res.json({
      "error": "Bad data!"
    });
  } else {
    const taskId = {
      _id: mongojs.ObjectId(req.params.id)
    };
    db.tasks.update(taskId, updatedTask, {}, function (err, task) {
      if (err) {
        res.send(err)
      } else {
        res.json(task);
      }
    });
  }


});

module.exports = router;