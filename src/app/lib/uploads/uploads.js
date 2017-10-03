import fetch from '../fetch/fetch';
import corsFetch from 'isomorphic-fetch';

export const requestSignedUploadUrl = (store, file) => store.dispatch(postSignedUploadUrl(file.name));


const postSignedUploadUrl = filename => (dispatch, getState) => fetch(
      '/uploads',
  {
    method: 'POST',
    body: JSON.stringify({ filename }),
    headers: getState().headers,
  }, dispatch)
      .then(json => decodeURIComponent(json.data.url));


export const uploadFile = (store, signedUrl, file) => {
  const body = new FormData();
  body.append('file', file);


  const fetchParams = {
    headers: {
      'Content-Type': file.type,
    },
    mode: 'cors',
    method: 'PUT',
    body,
  };

  return corsFetch(
    signedUrl,
    fetchParams,
  );
};
