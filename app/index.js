import angular from "angular";
import "angular-ui-router";
import "angular-ui-bootstrap";
import "./js/controllers";
import "./js/directives";
import "./js/filters";
import "./js/model";
import "./js/services";

alert('hot-loaded!');

var app = angular.module("Acoustudio", [
  "controllersModule",
  "directivesModule",
  "servicesModule",
  "filtersModule",
  "modelModule",
  "ui.router",
  "ui.bootstrap"
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/recordPage");

  $stateProvider
    // .state("app", {
    //   abstract: true,
    //   templateUrl: "app/views/app.html",
    //   controller: "RootCtrl",
    //   resolve: {
    //     session: "sessionPromise"
    //   }
    // })
    .state("recordPage", {
      templateUrl: "app/views/recordPage.html",
      controller: "RecordPageCtrl"
    });
});
