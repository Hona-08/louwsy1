// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT info@lowisy.com
import Mock from "fake-db/mock";
import { frequentlyBoughtData, relatedProducts } from "./related-data";

Mock.onGet("/api/frequently-bought-products").reply(async () => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    return [200, frequentlyBoughtData];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/related-products").reply(async () => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    return [200, relatedProducts];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});
