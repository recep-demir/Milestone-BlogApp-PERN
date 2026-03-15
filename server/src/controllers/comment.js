"use strict"

const Comment = require('../models/comment');
const Blog = require('../models/blog');
const CustomError = require('../helpers/customError');

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
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

        const result = await res.getModelList(Comment,{},['userId','blogId']);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Comment),
            result
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref: "#/definitions/Comment"
                }
            }
        */
       req.body.userId = req.user._id 
        const result = await Comment.create(req.body);
        await Blog.findByIdAndUpdate(
      req.body.blogId,
      { $push: { comments: result._id } }
    );

        res.status(201).send({
            error: false,
            result
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get Single Comment"
        */

        const result = await Comment.findById(req.params.id).populate(['userId','blogId']);

        res.status(200).send({
            error: false,
            result
        });
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref: "#/definitions/Comment"
                }
            }
        */

        const result = await Comment.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

        if (!result) throw new CustomError("Update failed, comment is not found or already updated", 404);

        res.status(202).send({
            error: false,
            result
        });
    },

    deletee: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */

        const comment = await Comment.findById(req.params.id);
        if (!comment) throw new CustomError("Comment not found", 404);

        const result = await Comment.findByIdAndDelete(req.params.id);

  
        await Blog.findByIdAndUpdate(comment.blogId, { $pull: { comments: comment._id } });

        res.status(200).send({
            error: false,
            result
        });
    },
}