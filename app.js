const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

const app = express();

// 連接資料庫
dotenv.config({path:"./config.env"});
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );

// const DB = 'mongodb://127.0.0.1:27017/homework';

mongoose.connect(DB).then(()=>{
    console.log('資料庫連線成功');
})
.catch((error)=>{
    console.log(error);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);
// 404 中間件
app.use((req, res, next) => {
    res.status(404).json({
        "status":"success",
        "message": "無此網站路由"
    });
  });
  

module.exports = app;
