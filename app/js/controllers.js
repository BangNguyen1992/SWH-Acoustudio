'use strict';
/* Controllers */
var module = angular.module("controllersModule", []);

module
  .controller("RecordPageCtrl", RecordPageCtrl);

function RecordPageCtrl($scope, $window, Record) {
  var vm = this;
  vm.saveToServer = saveToServer;

  function saveToServer(blobUrl) {
    console.log("in save", blobUrl);
    var base64 = blobUrl.split(',')[1];
    var recordObject = {
      "song": {
        "category": "test2",
        "description": "A very delicous test2",
        "blob": base64
      }
    };
    Record.save(recordObject, function(res) {
      console.log(res);
    }, function(err){
      alert(err);
    });
  }
}
