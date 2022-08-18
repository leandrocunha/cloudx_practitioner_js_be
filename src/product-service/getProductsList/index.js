'use strict';

exports.handler = async (event) => {
  const { dbConnection } = require('../../utils/dbConnection');
  const client = await dbConnection();

  const sql_query = `SELECT products.id, stocks.count, products.price, products.title, products.description
    FROM public.products
    LEFT JOIN public.stocks on products.id = stocks.product_id`;
  const result = await client.query(sql_query);
  const products = result.rows;
  const response = { statusCode: 200, body: JSON.stringify(products) };

  client.end();
  return response;
};
