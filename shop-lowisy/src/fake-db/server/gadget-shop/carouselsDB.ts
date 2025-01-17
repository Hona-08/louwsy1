// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT info@lowisy.com
import Mock from "fake-db/mock";
import {
  topPicksItem,
  mostViewedList,
  mainCarouselData,
} from "./gadget-store-data";

Mock.onGet("/api/gadget-store/main-carousel").reply(() => {
  try {
    return [200, mainCarouselData];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/gadget-store/top-picks-list").reply(() => {
  try {
    return [200, topPicksItem];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/gadget-store/most-viewed").reply(async () => {
  try {
    return [200, mostViewedList];
  } catch (err) {
      
    return [500, { message: "Internal server error" }];
  }
});
