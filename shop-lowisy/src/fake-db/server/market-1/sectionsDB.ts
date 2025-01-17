// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT info@lowisy.com
import bazaarReactDatabase from "data/bazaar-react-database";
import Mock from "fake-db/mock";
import {
  bottomCategoryList,
  carBrandList,
  mobileBrandList,
  mobileShopList,
  newArrivalsList,
  opticsBrandList,
  opticsShopList,
  serviceList,
  topRatedBrandList,
  topRatedList,
} from "./market-1-data";

Mock.onGet("/api/market-1/toprated-product").reply(async () => {
  try {
    return [200, topRatedList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/market-1/toprated-brand").reply(async () => {
  try {
    return [200, topRatedBrandList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/market-1/new-arrivals").reply(async () => {
  try {
    return [200, newArrivalsList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/market-1/car-brand-list").reply(async () => {
  try {
    return [200, carBrandList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

const cartList = bazaarReactDatabase.slice(0, 6);
Mock.onGet("/api/market-1/car-list").reply(async () => {
  try {
    return [200, cartList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/market-1/mobile-brand-list").reply(async () => {
  try {
    return [200, mobileBrandList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/market-1/mobile-shop-list").reply(async () => {
  try {
    return [200, mobileShopList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

const mobileData = bazaarReactDatabase.slice(81, 90);
Mock.onGet("/api/market-1/mobile-list").reply(async () => {
  try {
    return [200, mobileData];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/market-1/optics/watch-brands").reply(async () => {
  try {
    return [200, opticsBrandList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/market-1/optics/watch-shops").reply(async () => {
  try {
    return [200, opticsShopList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

const opticsData = bazaarReactDatabase.slice(95, 104);
Mock.onGet("/api/market-1/optics-list").reply(async () => {
  try {
    return [200, opticsData];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/market-1/bottom-categories").reply(async () => {
  try {
    return [200, bottomCategoryList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

const moreData = bazaarReactDatabase.slice(48, 60);
Mock.onGet("/api/market-1/get-more-items").reply(async () => {
  try {
    return [200, moreData];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/market-1/get-service-list").reply(async () => {
  try {
    return [200, serviceList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});
