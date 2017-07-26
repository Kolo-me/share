import Reflux from 'reflux';

import AccessToken from 'funshare/AccessToken';

let actions = Reflux.createActions([
  "auth",
  "unauth",
  { login: { asyncResult: true } },
  "logout",
  "gotomystuff",
  { signup: { asyncResult: true } },
  { loadUser: { asyncResult: true } },
  { onboard: { asyncResult: true, children: ["started"] } },
  { uploadPost: { asyncResult: true } },
  { loadPosts: { asyncResult: true } },
  
]);

/*actions.auth.listen(function () {
  AccessToken.get()
    .then((token) => actions.login(token))
    .catch((err) => actions.logout());
});

actions.unauth.listen(function () {
  AccessToken.clear();
});
*/
export default actions;
