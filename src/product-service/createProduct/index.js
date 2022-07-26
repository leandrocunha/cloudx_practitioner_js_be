'use strict';

exports.handler = async (event) => {
    const uuid = require('uuid').v4;
    const { dbConnection } = require('../../utils/dbConnection');
    const { escapeString } = require('../../utils/escapeString');
    const client = await dbConnection();

    const base64Decoded = Buffer.from(event.body, 'base64').toString();
    const params = new URLSearchParams(base64Decoded);
    const { title, description, price } = Object.fromEntries([...params])
    const sql_query = `INSERT INTO public.products (id, title, description, price)
        VALUES ('${uuid()}', E'${escapeString(title)}', E'${escapeString(description)}', ${price})
        RETURNING *`;
    const result = await client.query(sql_query);

    client.end();
    return {code: 201, body: result.rows[0]}
}