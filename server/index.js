import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

import pdf from 'html-pdf'
import { fileURLToPath } from 'url';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import invoiceRoutes from './routes/invoices.js'
import clientRoutes from './routes/clients.js'
import orderRoutes from './routes/orders.js'
import userRoutes from './routes/userRoutes.js'
import profile from './routes/profile.js'
import inventoryRoutes from './routes/inventories.js'
import productRoutes from './routes/products.js'

import orderSQLRoutes from './routes/psql/orders.js'
import customerSQLRoutes from './routes/psql/customer.js'
// import pdfTemplate from './documents/index.js'
import inv from './documents/invoice.js'
import invo from './documents/invo.js'
import mo from './documents/mo.js'
import emailTemplate from './documents/email.js'



const app = express()
dotenv.config()

app.use((express.json({ limit: "30mb", extended: true})))
app.use((express.urlencoded({ limit: "30mb", extended: true})))
app.use((cors()))

app.use('/getInvoices', invoiceRoutes)
app.use('/getClients', clientRoutes)
app.use('/getOrders', orderRoutes)
app.use('/getUsers', userRoutes)
app.use('/getProfiles', profile)
app.use('/inventories', inventoryRoutes)
app.use('/products', productRoutes)

app.use('/order', orderSQLRoutes)
app.use('/customer', customerSQLRoutes)



// NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port : process.env.SMTP_PORT,
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
    },
    tls:{
        rejectUnauthorized:false
    }
})


var options = { format: 'A4' };
// //SEND PDF INVOICE VIA EMAIL
// app.post('/send-pdf', (req, res) => {
//     const { email, company } = req.body

//     // pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
//     pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
       
//           // send mail with defined transport object
//         transporter.sendMail({
//             from: `${company.businessName ? company.businessName : company.name} <hello@arcinvoice.com>`, // sender address
//             to: `${email}`, // list of receivers
//             replyTo: `${company.email}`,
//             subject: `Invoice from ${company.businessName ? company.businessName : company.name}`, // Subject line
//             text: `Invoice from ${company.businessName ? company.businessName : company.name }`, // plain text body
//             html: emailTemplate(req.body), // html body
//             attachments: [{
//                 filename: 'invoice.pdf',
//                 path: `${__dirname}/invoice.pdf`
//             }]
//         });

//         if(err) {
//             res.send(Promise.reject());
//         }
//         res.send(Promise.resolve());
//     });
// });


//Problems downloading and sending invoice
// npm install html-pdf -g
// npm link html-pdf
// npm link phantomjs-prebuilt

//CREATE AND SEND PDF INVOICE

// app.post('/create-pdf', (req, res) => {
//     pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
//         if(err) {
//             res.send(Promise.reject());
//         }
//         res.send(Promise.resolve());
//     });
// });

app.post('/create-pdf', (req, res) => {
    pdf.create(invo(req.body), {}).toFile(`invoice.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

app.post('/create-mo', (req, res) => {
    pdf.create(mo(req.body), {}).toFile(`invoice.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//SEND PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
     res.sendFile(`${__dirname}/invoice.pdf`)
})




  if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('/app/*', (req,res) => {
        res.send(path)
        res.sendFile(path.join(__dirname,'client', 'build', 'index.html'));
    })
  } else {
    app.get('/', (req, res) => {
        res.send('SERVER IS RUNNING')
      })
  }

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
