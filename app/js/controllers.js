'use strict';
/* Controllers */
var module = angular.module("controllersModule", []);

module
  .controller("RecordPageCtrl", RecordPageCtrl)
  .controller("UploadFileCtrl", UploadFileCtrl)
  .controller("CombineRecordCtrl", CombineRecordCtrl)
  .controller("AudioPlayerCtrl", AudioPlayerCtrl);

function RecordPageCtrl($scope, $window, Record) {
  var vm = this;
  vm.saveToServer = saveToServer;

  function saveToServer(blobUrl) {
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
    }, function(err) {
      alert(err);
    });
  }
}

function CombineRecordCtrl($scope, $window, Record, $stateParams) {
  var vm = this;
  var songId = $stateParams.songId;
  vm.saveToServer = saveToServer;

  function saveToServer(blobUrl) {
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
      if (!res.song._id) {
        alert("Song not saved!");
        return;
      }
      Record.combine({
        instrument: res.song._id,
        vocal: songId,
        description: "Great22"
      }, function(res) {
        console.log(res);
      }, function(err) {
        console.log(res);
      })
    }, function(err) {
      alert(err);
    });
  }
}

function UploadFileCtrl($scope, Record) {
  // upload later on form submit or something similar
  $scope.submit = function() {
    if ($scope.form.file.$valid && $scope.file) {
      $scope.upload($scope.file);
    }
  };

  // upload on file select or drop
  $scope.upload = function(file) {
    var recordObject = {
      "song": {
        "category": "test2",
        "description": "A very delicous test2",
        "file": file
      }
    };
    Record.save(recordObject, function(resp) {
      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function(resp) {
      console.log('Error status: ' + resp.status);
    }, function(evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };
}

function AudioPlayerCtrl($scope, $sce) {
  $scope.config = {
    sources: [
      { src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.mp3"), type: "audio/mpeg" },
      { src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg" }
    ],
    theme: {
      url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
    }
  };
}
