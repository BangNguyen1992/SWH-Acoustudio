import angular from "angular";
import "materialize-css";
import "materialize-css-file";
import "angular-materialize";
import "angular-ui-router";
import "angular-ui-bootstrap";
import "angular-recorder";
import "./js/controllers";
import "./js/directives";
import "./js/filters";
import "./js/model";
import "./js/services";
import recorderFlash from "recorder-flash";

window.WaveSurfer = require("wavesurfer");

var app = angular.module("Acoustudio", [
  "controllersModule",
  "directivesModule",
  "servicesModule",
  "filtersModule",
  "modelModule",
  "ui.router",
  "ui.bootstrap",
  'ui.materialize',
  'angularAudioRecorder'
]);
app.config(function(recorderServiceProvider) {
  recorderServiceProvider
    .forceSwf(false)
    .setSwfUrl(recorderFlash)
    .withMp3Conversion(false);
});
app.constant("DEFAULT_ROOT_PATH", "");
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

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
    url: "/recordPage",
    templateUrl: "/views/recordPage.html",
    controller: "RecordPageCtrl",
    controllerAs:"vm"
  });
});
