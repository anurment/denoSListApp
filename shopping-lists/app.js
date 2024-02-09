import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as shoppingListController from "./controllers/shoppingListController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};


const handleRequest = async (request) => {
  const url = new URL(request.url);

  if(url.pathname === "/" && request.method === "GET"){
    return await shoppingListController.viewIndex(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await shoppingListController.viewShoppingLists(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await shoppingListController.addShoppingList(request);
  } else if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
    return await shoppingListController.deActivateList(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") { 
    return await shoppingListController.viewSingleList(request);
  } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") { 
    return await shoppingListController.markAsCollected(request);
  } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
    return await shoppingListController.addItem(request);
  } else {
    return new Response("Not found", { status: 404});
  }
};

serve(handleRequest, { port: 7777 });
