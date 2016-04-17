import angular from "angular";
import "materialize-css";
import "materialize-css-file";
import "angular-materialize";
import "angular-ui-router";
import "angular-ui-bootstrap";
import "./js/controllers";
import "./js/directives";
import "./js/filters";
import "./js/model";
import "./js/services";



var app = angular.module("Acoustudio", [
  "controllersModule",
  "directivesModule",
  "servicesModule",
  "filtersModule",
  "modelModule",
  "ui.router",
  "ui.bootstrap",
  'ui.materialize'
]);

app.config(function($stateProvider, $urlRouterProvider) {
});
