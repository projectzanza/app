import corsFetch from 'isomorphic-fetch';
import fetch from '../fetch/fetch';

const postSignedUploadUrl = filename => (dispatch, getState) => fetch(
  '/uploads',
  {
    method: 'POST',
    body: JSON.stringify({ filename }),
    headers: getState().headers,
  }, dispatch,
)
  .then(json => json.data);


export const requestSignedUploadUrl = (store, file) =>
  store.dispatch(postSignedUploadUrl(file.name));

export const uploadFile = (store, signedPost, file) => {
  const body = new FormData();
  Object.keys(signedPost.fields).forEach((key) => {
    body.append(key, signedPost.fields[key]);
  });
  body.append('file', file);


  const fetchParams = {
    mode: 'cors',
    method: 'POST',
    body,
  };

  return corsFetch(
    signedPost.url,
    fetchParams,
  )
    .then(response => response.text())
    .then((text) => {
      const xmlDoc = new DOMParser().parseFromString(text, 'text/xml');
      const uploadLocation = decodeURIComponent(xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue);
      return new Promise((resolve) => {
        resolve(uploadLocation);
      });
    });
};
