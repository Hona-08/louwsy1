import Mock from "fake-db/mock";
import bazaarReactDatabase from "data/bazaar-react-database";
import { topNewProducts, topSellingProducts } from "./furnitureShopData";

Mock.onGet("/api/furniture-shop/top-new-products").reply(() => {
  try {
    return [200, topNewProducts];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/furniture-shop/top-selling-products").reply(() => {
  try {
    return [200, topSellingProducts];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

const furnitureAllProducts = bazaarReactDatabase.slice(345, 354);
Mock.onGet("/api/furniture-shop/all-products").reply(() => {
  try {
    return [200, furnitureAllProducts];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});
