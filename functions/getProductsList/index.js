'use strict';

exports.handler = async (event) => {
  const products = require("../../mocks/products.json");
  const response = {
      statusCode: 200,
      body: JSON.stringify(products),
  };
  return response;
};