"use strict"

//* created a user controller

//? User model import:

const User = require("../models/user")

const Token = require("../models/token")

const PasswordEncrypt = require("../helpers/passwordEncrypt")

//? User controller:

module.exports = {
    list: async (req,res)=>{
         /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

        // user can only see his own infos
        const customFilters = req.user?.isAdmin ? {} : {_id: req.user._id}

        const data = await res.getModelList(User, customFilters)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
    },
    create: async (req,res)=>{
         /*

            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */
        
        // user can not log his self as an admin/staff
        req.body.isAdmin = false
        req.body.isStaff = false

        const data = await User.create(req.body)

        //* AUTO LOGIN:

        const tokenData = await Token.create({
            userId: data._id,
            token: PasswordEncrypt(data._id + Date.now())
        })

        res.status(201).send({
            error: false,
            data,
            token: tokenData.token
        })
    },
    read: async (req,res)=>{

        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
        
        // user can only see his own infos
        const customFilters = req.user?.isAdmin ? {_id: req.params.id} : {_id: req.user._id}

        const data = await User.findOne(customFilters)

        res.status(200).send({
            error: false,
            data
        })

    },
    update: async (req,res)=>{
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */
    
            const customFilters = req.user?.isAdmin ? {_id: req.params.id} : {_id: req.user._id}
            // user can not change his self as an admin/staff
            if(!req.user?.isAdmin){
                delete req.body.isAdmin
                delete req.body.isStaff
            }

            const data = await User.updateOne(customFilters, req.body, {runValidators: true})

            res.status(202).send({
                error:false,
                data,
                new: await User.findOne(customFilters),
                old: await User.findOne(customFilters),
                message: "User updated successfully"
            })
    },
    delete: async (req,res)=>{
         /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        // user can delete only his own infos

        // isAdmin check is not neccesary here because we already checking in permissions.isAdmin
        // const customFilters = req.user?.isAdmin ? {_id: req.params.id} : {_id: req.user._id}

        if(req.params.id != req.user._id){
            const data = await User.deleteOne({_id: req.params.id})

            res.status(data.deletedCount ? 204 : 404).send({
                error: false,
                data
            })
        }else{
            // res.errorStatusCode = 403
            // throw new Error("You can not delete your self")
            res.status(400).send({
                error: true,
                message: "You can not delete your self"
            })
        }
    },
}

