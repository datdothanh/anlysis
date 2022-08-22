const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dayjs = require("dayjs");
const axios = require("axios");
const db = require("./db");
const app = express();
const port = process.env.PORT || 8000;
const TimeUser = require("./model/TimeUser");
const Profile = require("./model/Profile");
const Anlysis = require("./model/Anlysis");
const Result = require("./model/Result");
const Class = require("./model/Class");
const { spawn } = require("child_process");
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

db.connect();
app.listen(port, () => {
  console.log("app running on port " + port);
});

app.get("/", (req, res) => {
  TimeUser.find((err, todos) => {
    if (err) console.log(err);
    else {
      res.json("hello");
    }
  });
});

app.get("/used_time", (req, res) => {
  TimeUser.find((err, todos) => {
    if (err) console.log(err);
    else {
      res.json(todos);
    }
  });
});

app.post("/used_time", (req, res) => {
  const timeUser = new TimeUser(req.body);

  timeUser
    .save()
    .then((timeUser) => {
      res.status(200).json(timeUser);
    })
    .catch((err) => {
      res.status(400).send("adding new timeUser failed");
    });
});

app.get("/used_time/:id", (req, res) => {
  const id = req.params.id;
  TimeUser.findById(id, (err, timeUser) => {
    res.json(timeUser);
  });
});

app.put("/used_time/:id", (req, res) => {
  TimeUser.findById(req.params.id, (err, timeUser) => {
    if (!timeUser) res.status(404).send("Data is not found");
    else {
      timeUser.userName = req.body.userName;
      timeUser.oSName = req.body.oSName;
      timeUser.date = req.body.date;
      timeUser.useTimeNumber = req.body.useTimeNumber;
      timeUser.facebookTimeUse = req.body.facebookTimeUse;
      timeUser.youtubeTimeUse = req.body.youtubeTimeUse;
      timeUser.other = req.body.other;
      timeUser
        .save()
        .then((timeUser) => {
          res.json(timeUser);
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

app.delete("/delete_used_time/:id", (req, res) => {
  const id = req.params.id;

  TimeUser.deleteMany({ _id: id })
    .then(() =>
      res.status(200).json({
        success: true,
        message: "deleted",
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra",
      });
    });
});

const Abc = async () => {
  const child = spawn("python", ["test.py"], {
    cwd: "D:/ki1_nam5/csdl_lon/",
  });

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  child.on("error", (error) => console.log(`error: ${error.message}`));

  child.on("close", (code) => {
    console.log(`Analysing data closed with code ${code}`);
  });
};

app.post("/anlysis", async (req, res) => {
  await Abc();
  setTimeout(function () {
    res.json({
      status: "ok",
    });
  }, 10000);
});

app.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  Profile.findById(id, (err, profile) => {
    res.json(profile);
  });
});

app.get("/result", (req, res) => {
  Result.find((err, result) => {
    console.log("result", result);
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
});

// app.get("/anlysis_profile", (req, res) => {
//   const child = spawn('python',["test.py"],{cwd: 'D:\ki1_nam5\csdl_lon\test.py'})

//     child.stdout.on('data', (data)=> {
//       console.log(`stdout123: ${data}`)
//     })

//     child.stderr.on('data', (data)=> {
//       console.log(`stderr: ${data}`)
//     })

//     child.on("error", (error) => console.log(`error: ${error.message}`))

//     child.on('close', (code) => {
//       console.log(`Analysing data closed with code ${code}`);
//       next();
//     })
//     res.json({
//       status: 'ok'
//     })
// });

// app.get("/profile", (req, res) => {
//   Profile.find((err, profile) => {
//     if (err) console.log(err);
//     else {
//       res.json(profile);
//     }
//   }).limit(10).skip(10*(req.query.page-1));
// });

app.get("/profile", (req, res) => {
  
  Profile.aggregate([
    {
      $lookup: {
        from: "classes",
        localField: "idClass",
        foreignField: "_id",
        as: "class",
      },
    },
  ]).exec((err, result) => {
    if (err) {
      console.log("error", err);
    }
    if (result) {
      res.json(result.splice(5*(req.query.page-1), 5));
    }
  });
});

app.post("/profile", (req, res) => {
  const profile = new Profile(req.body);

  profile
    .save()
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((err) => {
      res.status(400).send("adding new profile failed");
    });
});

app.put("/profile/:id", (req, res) => {
  Profile.findById(req.params.id, (err, profile) => {
    if (!profile) res.status(404).send("Data is not found");
    else {
      profile.userName = req.body.userName;
      profile.height = req.body.height;
      profile.weight = req.body.weight;
      profile.idClass = req.body.idClass;
      profile
        .save()
        .then((profile) => {
          res.json(profile);
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

app.delete("/delete_profile/:id", (req, res) => {
  const id = req.params.id;

  Profile.deleteMany({ _id: id })
    .then(() =>
      res.status(200).json({
        success: true,
        message: "deleted",
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra",
      });
    });
});

app.get("/classRoom", (req, res) => {
  if (req.query.page > -1) {
    Class.find((err, profile) => {
      if (err) console.log(err);
      else {
        res.json(profile);
      }
    })
      .limit(10)
      .skip(10 * (req.query.page - 1));
  } else {
    Class.find((err, profile) => {
      if (err) console.log(err);
      else {
        res.json(profile);
      }
    });
  }
});

app.post("/classRoom", (req, res) => {
  const classRoom = new Class(req.body);

  classRoom
    .save()
    .then((classRoom) => {
      res.status(200).json(classRoom);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put("/classRoom/:id", (req, res) => {
  Class.findById(req.params.id, (err, classRoom) => {
    if (!classRoom) res.status(404).send("Data is not found");
    else {
      classRoom.userName = req.body.userName;
      classRoom.height = req.body.height;
      classRoom.weight = req.body.weight;
      classRoom
        .save()
        .then((classRoom) => {
          res.json(classRoom);
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

app.delete("/delete_classRoom/:id", (req, res) => {
  const id = req.params.id;

  Class.deleteMany({ _id: id })
    .then(() =>
      res.status(200).json({
        success: true,
        message: "deleted",
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra",
      });
    });
});
