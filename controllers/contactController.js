const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const getContacts = asyncHandler(async (req,res) =>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req,res) =>{
    console.log(req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(contact);
});

const getContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404).json('contact not found')
    }

    res.status(200).json(contact);
});

const updateContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404).json('contact not found')
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404).json('contact not found')
    }
    await Contact.deleteOne(contact
        );
    res.status(200).json(contact);
});

module.exports = {getContacts, createContact,getContact, updateContact, deleteContact };