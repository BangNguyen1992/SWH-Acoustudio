'use strict';
import RecordRTC from "recordrtc";
/* Services */
var module = angular.module("servicesModule", []);

module.factory("AudioService", AudioService);

function AudioService($window, $http) {
  var _recordRTC = {};
  console.log($window.navigator, navigator, $window.Navigator);
  navigator.userMedia = (
    $window.navigator.getUserMedia ||
    $window.navigator.webkitGetUserMedia ||
    $window.navigator.mozGetUserMedia ||
    $window.navigator.msGetUserMedia);

  navigator.getUserMedia({ audio: true, video: false },
    function(stream) {
      console.log('starting to initialize getUserMedia');
      _recordRTC = RecordRTC(stream, { recorderType: StereoAudioRecorder });
      console.log('Finished initializing getUserMedia');
    },
    function(err) {
      console.log('Error initializing media stream: ' + error);
    });
  console.log("nav", navigator);
  var instance = {};

  instance.startRecording = function(duration) {
    var recordMp3Container = document.getElementById('recordmp3-container');
    console.log('starting to record...');
    console.log('sample rate: ' + _recordRTC.sampleRate);
    _recordRTC.setRecordingDuration(duration).onRecordingStopped(stoppedCallback);
    _recordRTC.startRecording();

    function stoppedCallback(url) {
      var audio = new Audio();
      audio.controls = true;
      audio.src = URL.createObjectURL(_recordRTC.blob);
      recordMp3Container.appendChild(audio);
      audio.play();
      recordMp3Container.appendChild(document.createElement('hr'));
    }
  };

  instance.stopRecording = function(uploadPath) {
    console.log('sample rate: ' + _recordRTC.sampleRate);

    _recordRTC.stopRecording(function(audioVideoMURL) {
      console.log('stopped recording...');
      console.log('recordrtc stop sample rate: ' + _recordRTC.sampleRate);

      $http({
        method: 'POST',
        url: uploadPath,
        data: _recordRTC.getBlob()
      }).success(function(data) {
        console.log('POST /audio Success');

      }).error(function() {
        console.log('POST /audio error');
      });
    });

  };
  return instance;
}
