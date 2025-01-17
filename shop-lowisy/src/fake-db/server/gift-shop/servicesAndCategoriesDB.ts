// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT info@lowisy.com
import Mock from "fake-db/mock";
import { serviceList, topCategories } from "./giftShopData";

Mock.onGet("/api/gift-shop/service-list").reply(() => {
  try {
    return [200, serviceList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/gift-shop/top-categories").reply(() => {
  try {
    return [200, topCategories];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});
