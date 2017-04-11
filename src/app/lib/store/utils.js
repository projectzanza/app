export const storeResults = (store, bucketName) => {
  const bucket = store.getState()[bucketName];
  if (bucket.resultIds) {
    return bucket.resultIds.map(key => bucket.items[key]);
  }
  return [];
};

export const singleItem = (store, bucketName, itemId) => {
  const bucket = store.getState()[bucketName];
  return bucket.items[itemId];
};
