import { sql } from "../database/database.js";

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES ( ${name} )`;
};

const findAllActiveLists = async () => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE active = true;`;
    return rows;
};

const findListById = async (listId) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${listId};`;
    return rows[0];
};


const deActivate = async (listId) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${listId};`;
};

const createItem = async (name, listId) => {
    await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name} , ${listId} );`;
};

const setAsCollected = async (listId, itemId) => {
    await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${itemId} AND shopping_list_id = ${listId};`;
};


//check this
const findAllItemsById = async (listId) => {
    const rows = await sql`SELECT * FROM shopping_list_items
        WHERE shopping_list_id = ${listId} ORDER BY name ASC;`

    return rows;
    
};

const countShoppingLists = async () => {
    const rows = await sql`SELECT COUNT(*) AS count FROM shopping_lists;`;
    return rows[0].count;
};

const countItems = async () => {
    const rows = await sql`SELECT COUNT(*) AS count FROM shopping_list_items;`;
    return rows[0].count;
};

export {create, findAllActiveLists, findListById, deActivate, createItem, setAsCollected, findAllItemsById, countShoppingLists, countItems};

