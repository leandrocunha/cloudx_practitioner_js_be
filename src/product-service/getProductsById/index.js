'use strict';

exports.handler = async (event) => {
  const { dbConnection } = require('../../utils/dbConnection');
  const { pathParameters: { productId } } = event;

  const client = await dbConnection();
  const sql_query = `SELECT products.id, stocks.count, products.price, products.title, products.description
    FROM public.products
    LEFT JOIN public.stocks on products.id = stocks.product_id
    WHERE products.id = '${productId}'`;
  const result = await client.query(sql_query);
  const product = result.rows[0];
  const response = {statusCode: 200, body: JSON.stringify(product)};

  client.end();
  return response;
};  