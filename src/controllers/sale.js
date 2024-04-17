"use strict";

// Sale controller:

const Sale = require("../models/sale");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "List Sales"
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

    const data = await res.getModelList(Sale);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Sale),
      data,
    });
  },
  create: async (req, res) => {
    const data = await Sale.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Get Single Sale"
        */

    console.log('read calisti')

    if (req.params?.id) {
      const data = await Sale.findOne({ _id: req.params.id });

      res.status(200).send({
        error: false,
        data,
      });
    } else {
      const data = await res.getModelList(Sale);

      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Sale),
        data,
      });
    }
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Update Sale"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Sale 1"
                }
            }
        */

    const data = await Sale.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Sale.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Delete Sale"
        */

    const data = await Sale.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
