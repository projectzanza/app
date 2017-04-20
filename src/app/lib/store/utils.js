export const storeResults = (store, bucketName, resultId) => {
  const bucket = store.getState()[bucketName];
  if (bucket.results[resultId]) {
    return bucket.results[resultId].map(key => bucket.items[key]);
  }
  return [];
};

export const singleItem = (store, bucketName, itemId) => {
  const bucket = store.getState()[bucketName];
  return bucket.items[itemId];
};
