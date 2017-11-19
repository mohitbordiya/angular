const express = require('express');
const router = express.Router();
var nodemailer = require("nodemailer");
const Contact = require('../models/contacts');


// var smtpTransport = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth: {
//         user: "sajagporwal123",
//         pass: "**************"
//     }
// });




var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "3f84163041d190",
        pass: "6ef6472c613581"
    }
});



//retrieving Contacts
router.get('/contacts', (req, res, next) => {
    Contact.find(function (err, contacts) {
        res.json(contacts);
    });
});

//add Contact
router.post('/contact', (req, res, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    });
    newContact.save((err, contact) => {
        if (err) {
            res.json({
                msg: 'Failed to add Contact'
            });
            // console.log('error in add new contact is ' + err);
        }
        else {
            // console.log(contact);
            var receiver = contact.email
            var img = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1rvCiKtfZNlufbyOt4UNhV20UU1ihcpVWGxSgh7MmOJFujVKSvw" alt="Thank You" style="width:304px;height:228px;">'
            var msg = 'Welcome  ' + '<strong>' + contact.first_name + '</strong>' + '  your phone no  ' + contact.phone + '  is successfully added' + '<br><hr><br>' + img;
            var mailOptions = {
                from: "<abc@abc.com>",
                to: receiver,
                subject: 'Welcome',
                html: msg
            }
            // console.log(mailOptions);
            transport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    res.end("error");
                } else {
                    // console.log(response);
                    console.log("Message sent: ");
                    // res.end("sent");
                }
            });
            res.json({
                msg: 'Contact Added Successfully'
            });
        }
    });
});


//delete Contact
router.delete('/contact/:id', (req, res, next) => {
    Contact.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            // console.log( 'error in delete contact is '+ err); 
            res.json(err);
        }
        else {
            // console.log('Contact deleted successfully '+result);
            res.json(result);
        }
    });
});

//Update Contact
router.put('/contact/:id', (req, res, next) => {
    // console.log('first name is ' + req.body.first_name);
    let updateContact = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    }
    // console.log(updateContact.first_name);
    // console.log(updateContact);
    Contact.findByIdAndUpdate(req.params.id, { $set: updateContact }, function (err, result) {
        if (err) {
            console.log('error in update contact is ' + err);
            res.json(err);
        }
        else {
            console.log('Contact update successfully ' + result);
            res.json(result);
        }
    });
});

module.exports = router;