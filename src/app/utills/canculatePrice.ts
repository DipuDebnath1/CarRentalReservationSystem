export function calculateTotalPrice(
  pickUpDate: string,
  dropOffDate: string,
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number {
  const pickUp = new Date(`${pickUpDate}/${startTime}`);
  const dropOff = new Date(`${dropOffDate}/${endTime}`);

  // Calculate the total time difference in hours
  const diffInMs = dropOff.getTime() - pickUp.getTime();
  const totalHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours

  // Calculate total price
  const totalPrice = totalHours * pricePerHour;

  return totalPrice;
}
