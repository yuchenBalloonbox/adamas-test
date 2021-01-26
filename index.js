const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.TEST_ENV);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get('/',(req,res) => {
  res.send('reach backend')
})

app.post("/",(req, res) => {
  console.log(req.body);
  const {
    id,
    login,
    display_name,
    type,
    broadcaster_type,
    description,
    profile_image_url,
    offline_image_url,
    view_count,
    created_at,
  } = req.body;

  let queryString = `INSERT INTO adamas
  (id,displayname, login, description,createat, updateat, broadcastertype, offlineimgurl, profileimgurl,type,viewcount)
  values (
    '${id ? id : ""}',
    '${display_name ? display_name : ""}',
    '${login ? login : ""}',
    '${description ? description : ""}',
    '${created_at ? created_at : ""}',
    '${new Date().getTime()}',
    '${broadcaster_type ? broadcaster_type : ""}',
    '${offline_image_url ? offline_image_url : ""}',
    '${profile_image_url ? profile_image_url : ""}',
    '${type ? type : ""}',
    ${view_count})
    
    ON Conflict (id)
    DO UPDATE SET
    displayname = EXCLUDED.displayname, 
    login = EXCLUDED.login, 
    description = EXCLUDED.description,
    createat = EXCLUDED.createat,
    updateat = EXCLUDED.updateat,
    broadcastertype = EXCLUDED.broadcastertype,
    offlineimgurl = EXCLUDED.offlineimgurl,
    profileimgurl = EXCLUDED.profileimgurl,
    type = EXCLUDED.type,
    viewcount = EXCLUDED.viewcount;
    `;

  console.log("this is query string", queryString);

  pool.query(queryString, (err, res) => {
    if (err) {
      console.log("Error ", err);
    }

    if (res) {
      console.log("Response ", res);
    }

    // pool.end()
  });
  res.send("got req");
});

app.listen(process.env.port || 5001);

console.log("Running at Port 5001");

const { Pool, Client } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

client.connect().then(() => console.log("Connected successfully"));
