import React from 'react'
import ReactDOM from 'react-dom'

import useModel from './useModel'
import ObjectDetectionVideo from './object-detection-video/ObjectDetectionVideo'

import './index.css'

var accident
var incident = false
var frame = []
const t = 1000 // time in milisecond to confirm detection
const numDetected = 5 // num of accident detected in t
const handlePrediction = (predictions) => {
  if(Date.now() - frame[0] >= t){
    if (frame.length > numDetected) {
      console.log(frame.length)
      console.log(accident)
      imageCapture()
      sendReq()
      alert(accident)
      frame = []
    } else frame = [] // re initialise frame
  }
  predictions.forEach((prediction) => {
    if (prediction.label === 'Peaceful situation'){
        accident = prediction.label
        frame.push(Date.now())
      }
  })  
  console.log(predictions)
  // console.timeEnd('detect')
  // console.time('detect')

}

const imageCapture = () => {
  var video = document.getElementsByTagName('video')[0];
  var canvas = document.getElementsByTagName('canvas')[0];
  var ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imgUrl =canvas.toDataURL('image/png')
  console.log(imgUrl)
  return imgUrl
}

const sendReq = () => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      deviceKey: "blah",
      imageURL: "HALLO",
      severity: 0, // 1 or 2
      eventType: accident
    })
  };
  fetch('http://localhost:3001/iot/report', requestOptions)
  //     .then(response => response.json())
  //     .then(data => this.setState({ postId: data.id }));
  
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
ReactDOM.render(<App />, rootElement)