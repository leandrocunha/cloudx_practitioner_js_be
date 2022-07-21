'use strict';

exports.handler = async (event) => {
  const { pathParameters: { productId } } = event;
  const products = require("../../mocks/products.json");
  const product = products.find(item => item.id === productId);
  const response = {
      statusCode: 200,
      body: JSON.stringify(product),
  };
  return response;
};