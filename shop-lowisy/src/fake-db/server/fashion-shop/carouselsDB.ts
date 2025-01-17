// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT info@lowisy.com
import Mock from "fake-db/mock";
import { hotDealsData, dealOfTheWeekList } from "./fashion-store-data";

Mock.onGet("/api/fashion-store/deal-of-the-week").reply(() => {
  try {
    return [200, dealOfTheWeekList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/fashion-store/hot-deals").reply(() => {
  try {
    return [200, hotDealsData];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});
