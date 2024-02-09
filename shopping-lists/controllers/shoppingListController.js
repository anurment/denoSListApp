import { renderFile } from "../deps.js";
import * as shoppingListService from "../services/shoppingListService.js";
import * as requestUtils from "../utils/requestUtils.js"

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewIndex = async (request) => {
    const data = {
        n_lists: await shoppingListService.countShoppingLists(),
        n_items: await shoppingListService.countItems(),
    };

    return new Response(await renderFile("index.eta", data), responseDetails);
};

const addShoppingList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
  
    await shoppingListService.create(name);  
    return requestUtils.redirectTo("/lists");
};

const viewShoppingLists = async (request) => {
    const data = {
      lists: await shoppingListService.findAllActiveLists(),
    };

    //console.log(data.lists);
    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const deActivateList = async (request) => {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[2];
    await shoppingListService.deActivate(id);
    return requestUtils.redirectTo(`/lists`);

};

const addItem = async (request) => {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[2];
    const formData = await request.formData();
    const name = formData.get("name");

    await shoppingListService.createItem(name, id);
    return requestUtils.redirectTo(`/lists/${id}`);

};

const viewSingleList = async (request) => {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[2];
    const data = {
        slist: await shoppingListService.findListById(id),
        items: await shoppingListService.findAllItemsById(id),
    };

    return new Response(await renderFile("list.eta", data), responseDetails);
};

const markAsCollected = async (request) => {
    const url = new URL(request.url);
    const url_array = url.pathname.split("/");
    const listId = url_array[2];
    const itemId = url_array[4];

    await shoppingListService.setAsCollected(listId, itemId);
    return requestUtils.redirectTo(`/lists/${listId}`);
};

export { addShoppingList, viewShoppingLists,deActivateList, addItem, viewSingleList, markAsCollected, viewIndex };
 
  