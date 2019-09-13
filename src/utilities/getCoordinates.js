// Helper function to get grid coordinates of a point from the id in the table
export function getCoordinates(id) {
  const indexes = id.split("-").map(el => {
    let n = parseInt(el);
    return n;
  });

  return indexes;
}
