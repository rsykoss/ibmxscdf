import React from 'react'
import ReactDOM from 'react-dom'

import useModel from './useModel'
import ObjectDetectionVideo from './object-detection-video/ObjectDetectionVideo'
import Profile from './Elderly/Profile';

import './index.css'

const axios = require('axios').default;
var accident
var frame = {majorFire: [], minorFire: [], majorFall: [], minorFall: []}
const t = 1000 // time in milisecond to confirm detection
const numDetected = 5 // num of accident detected in t
const handlePrediction = (predictions) => {
  for(var key in frame) {
    if(Date.now() - frame[key][0] >= t){
      if (frame[key].length > numDetected) {
        console.log(accident)
        var severity, urlLink = ""
        if(key.includes("minor")){
          severity = 0
          urlLink = getImageURL()
        }else {
          severity = 1
          urlLink = getImageURL()
        }
        sendReq(urlLink, severity)
        alert(accident)
        frame[key] = [] 
      } else frame[key] = []  // re initialise frame
    }
  }
  predictions.forEach((prediction) => {
    console.log(prediction.label)
    if (prediction.label === "Major kitchen fire"){
      accident = "Major Fire Accident"
      frame.majorFire.push(Date.now())
    }else if (prediction.label === "Minor kitchen fire"){
      accident = "Minor Fire Accident"
      frame.minorFire.push(Date.now())
    }else if (prediction.label === "Major Fall"){
      accident = "Major Fall Accident"
      frame.majorFall.push(Date.now())
    }else if (prediction.label === "Minor Fall"){
      accident = "Minor Fall Accident"
      frame.minorFall.push(Date.now())
    }
  })  
  console.log(predictions[0])
  // console.timeEnd('detect')
  // console.time('detect')
}

const getImageURL = () => {
  var video = document.getElementsByTagName('video')[0];
  var canvas = document.getElementsByTagName('canvas')[0];
  var ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imgUrl =canvas.toDataURL('image/png')
  return dataURItoBlob(imgUrl)
}
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type:mimeString});
}

function sendReq(image, severity) {
  var bodyFormData = new FormData();
  bodyFormData.set('deviceKey', '1234');
  bodyFormData.append('image', image);
  bodyFormData.set('severity', severity);
  bodyFormData.set('eventType', accident);
  axios({
    method: 'post',
    url: 'http://localhost:3001/iot/report',
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data', "Accept": "application/json", "type": "formData" }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });
}

const render = (ctx, predictions) => {
  predictions.forEach((prediction) => {
    const x = prediction.bbox[0]
    const y = prediction.bbox[1]
    const width = prediction.bbox[2]
    const height = prediction.bbox[3]

    ctx.setStrokeStyle('#0062ff')
    ctx.setLineWidth(4)
    ctx.strokeRect(
      Math.round(x),
      Math.round(y),
      Math.round(width),
      Math.round(height)
    )
  })
}

const App = () => {
  const model = useModel(process.env.PUBLIC_URL + '/model_web')

  return (
    <div className="fillPage">
      <ObjectDetectionVideo
        model={model}
        onPrediction={handlePrediction}
        // render={render}
        // aspectFill: The option to scale the video to fill the size of the view.
        //             Some portion of the video may be clipped to fill the view's
        //             bounds.
        // aspectFit:  The option to scale the video to fit the size of the view
        //             by maintaining the aspect ratio. Any remaining area of the
        //             view's bounds is transparent.
        fit="aspectFill"
        // mirrored:   mirror the video about its vertical axis.
        mirrored
      />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Profile />, rootElement)
