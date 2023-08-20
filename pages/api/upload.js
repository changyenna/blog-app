// const express = require('express');
// const FormData = require('form-data');
// import fetch from 'node-fetch';
// const multer = require('multer')();

// const app = express();

// app.post('/upload', multer.single('fileUpload'), (req, res, next) => {
//   const fileUpload = req.file;

//   if (!fileUpload) {
//     const error = new Error('No file attached');
//     error.status = 400;
//     return next(error);
//   }

//   const form = new FormData();

//   form.append('fileUpload', fileUpload.buffer, fileUpload.originalname);

//   fetch(`${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}/upload`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
//     },
//     body: form,
//   })
//     .then((response) => response.json())
//     .then((data) => res.send(data))
//     .catch((err) => res.send({ message: 'Something went wrong' }));
// });

// app.listen(4000, () => {
//   console.log('Running on port 4000');
// });

// const FormData = require('form-data');
// import fetch from 'node-fetch';

// const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     console.log('Method not allowed');
//     return res.status(405).end();
//   }

//   const form = new FormData();
//   form.append('fileUpload', req.body, req.query.filename);

//   try {
//     const response = await fetch(`${graphqlAPI}/upload`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
//         ...form.getHeaders(),
//       },
//       body: form,
//     });

//     if (response.ok) {
//       console.log('File upload successful');
//     } else {
//       console.error('File upload failed');
//     }

//     const responseText = await response.text();
//     console.log('Response:', responseText);

//     const data = await response.json();
//     res.status(response.status).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// }
// const FormData = require('form-data');
// import multer from 'multer';
// import express from 'express';
// import { GraphQLClient } from 'graphql-request';

// const graphqlAPI = process.env.ASSET_UPLOAD_ENDPOINT;
// const upload = multer({
//   limits: {
//     fileSize: 500,
//   },
// });
import express from 'express';
import FormData from 'form-data';
import multer from 'multer';
import fetch from 'node-fetch';
const app = express();

const upload = multer();
app.post('/upload', upload.single('file'), (req, res, next) => {
  console.log('request revieved');
  const file = req.file;

  if (!file) {
    const error = new Error('No file attached');
    error.status = 400;
    return next(error);
  }

  const form = new FormData();

  form.append('file', file.buffer, file.originalname);

  fetch(process.env.ASSET_UPLOAD_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
    body: form,
  })
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((err) => res.send({ message: 'Something went wrong' }));
});

app.listen(4000, () => {
  console.log('Running on port 4000');
});
