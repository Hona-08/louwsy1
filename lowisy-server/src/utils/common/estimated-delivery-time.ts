const geolib = require('geolib')

// Shop coordinates
const shopLat = 37.7749 // Replace with your shop's latitude
const shopLng = -122.4194 // Replace with your shop's longitude

// Function to calculate the distance between the customer and the shop
function calculateDistance(customerLat: any, customerLng: any) {
  const distanceInMeters = geolib.getDistance(
    { latitude: customerLat, longitude: customerLng },
    { latitude: shopLat, longitude: shopLng },
  )

  // Convert distance from meters to kilometers
  const distanceInKilometers = distanceInMeters / 1000
  return distanceInKilometers
}

// Function to estimate delivery time based on distance
export default function estimateDeliveryTime(distance: any): number {
  // Assume average speed in kilometers per hour
  const averageSpeed: number = 60

  // Calculate estimated travel time
  const estimatedTravelTime: number = distance / averageSpeed

  // Return estimated delivery time in hours
  return estimatedTravelTime
}

// Example usage
const distanceInKm: number = 200
const estimatedTime: number = estimateDeliveryTime(distanceInKm)

// Sample usage
const customerLat = 37.7749 // Replace with customer's latitude
const customerLng = -122.4194 // Replace with customer's longitude

console.log(`Estimated delivery time: ${estimatedTime.toFixed(2)} hours`)
