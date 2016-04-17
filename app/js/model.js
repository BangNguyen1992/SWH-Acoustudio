import ngResource from 'angular-resource'

angular.module("modelModule", ["ngResource"])
  .factory("Record", Record)
  .factory("User", User);

function Record($resource, DEFAULT_ROOT_PATH) {
  var model = $resource(DEFAULT_ROOT_PATH + "/api/songs", null, {
    save: {
      method: "POST",
      headers: { 'Authorization': 'eyJhbGciOiJIUzI1NiJ9.NTcxMWUwN2Y4MzM1OWZjMzBlZmQ1Y2Rm.a1dKaruM0m-Q8qhQjzT1hVR1xJiglO6FIvPkyFzlOWA' }
    },
    getList: {
      method: "GET"
    },
    combine: {
      method: "POST",
      url: DEFAULT_ROOT_PATH + "/api/combine"
    }
  });
  return model;
}

function User($resource, DEFAULT_ROOT_PATH) {
  var model = $resource(DEFAULT_ROOT_PATH + "/api/users", null, {
    signup: {
      method: "POST"
    },
    login: {
      method: "POST",
      url: DEFAULT_ROOT_PATH + "/api/users/login"
    }
  });
}
