import angular from "angular";
import "materialize-css";
import "materialize-css-file";
import "angular-materialize";
import "angular-ui-router";
import "angular-ui-bootstrap";
import "angular-recorder";
import "ng-file-upload";
import "angular-sanitize";
import "videogular";
import "videogular-controls";
import "./js/controllers";
import "./js/model";
import "./js/directives";
import "./js/filters";
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
  'angularAudioRecorder',
  "ngFileUpload",
  "ngSanitize",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
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
    .state("audioPlayer", {
      url: "/audioPlayer",
      templateUrl: "/views/audioPlayer.html",
      controller: "AudioPlayerCtrl"
    })
    .state("recordPage", {
      url: "/recordPage",
      templateUrl: "/views/recordPage.html",
      controller: "RecordPageCtrl",
      controllerAs: "vm"
    })
    .state("uploadFile", {
      url: "/uploadFile",
      templateUrl: "/views/uploadFile.html",
      controller: "UploadFileCtrl"
    })
    .state("combineRecord", {
      url: "/recordPage/:songId",
      templateUrl: "/views/combineRecord.html",
      controller: "CombineRecordCtrl"
    });
});
