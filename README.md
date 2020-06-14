# Kampung App (not done yet)
Creative solution meant to help elderly blah.


## Contents (need to finalise)

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Long description](#long-description)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Running the tests](#running-the-tests)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Contributing](#contributing)
1. [Versioning](#versioning)
1. [Authors](#authors)
1. [License](#license)
1. [Acknowledgments](#acknowledgments)

## Short description

### What's the problem? (not done yet)

Part of the World Health Organization's guidance on limiting further spread of COVID-19 is to practice social distancing. As a result, schools in most affected areas are taking precautionary measures by closing their facilities. With school-aged children at home for an indeterminate amount of time,  keeping them engaged, entertained, and on top of their education is important.

### How can technology help? (not done yet)

Schools and teachers can continue to engage with their students through virtual classrooms, and even create interactive spaces for classes. As parents face a new situation where they may need to homeschool their children, finding appropriate online resources is important as well.

### The idea (partial)
Our team chose to work on problem statement A. We wish to address the lack of efficiency with the current method of alerts which hinges on manual reports. By recognising that most of the incidents happen at the homes of the elderly, community reports to alert CFRs would not be sufficient. For elderly who live alone, they might face challenges in contacting SCDF during incidents such as losing consciousness. 

It's imperative that learning and creating can continue when educational institutions have to shift the way they teach in times of crises, such as the COVID-19 pandemic. Providing a set of open source tools, backed by IBM Cloud and Watson Services, will enable educators to more easily make content available for their students.

## Demo video (not done yet)

[![Watch the video](https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/IBM-interview-video-image.png)](https://youtu.be/vOgCOoy_Bx0)

## The architecture (not done yet)

![Image Here](https://developer.ibm.com/developer/tutorials/cfc-starter-kit-speech-to-text-app-example/images/cfc-covid19-remote-education-diagram-2.png)

1. The user navigates to the site and uploads a video file.
2. Watson Speech to Text processes the audio and extracts the text.
3. Watson Translation (optionally) can translate the text to the desired language.
4. The app stores the translated text as a document within Object Storage.

## Long description (not done yet)

[More detail is available here](DESCRIPTION.md)

## Project roadmap (not done yet)
![image](https://user-images.githubusercontent.com/42865415/84589090-f04da280-ae5e-11ea-9ced-fee11c30066d.png)

## Getting started (doing)
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. Live copy of this is up in section [Live demo](#live-demo)

### Prerequisites
Make sure these software are installed:
1. [Node.js](https://nodejs.org/en/download/)
2. [npm] - Comes with Node.js
3. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
Verify via:
```cmd
node -v
npm -v
git --version
```
### Set Up
If all the prerequisites have been fulfilled, follow the steps below. This repository contains server and React app hence node modules have to be installed and built separately.
1. **Clone Git Repo**
```bash
git clone https://github.com/rsykoss/ibmxscdf.git
```
2. **npm install for server** 
```bash
cd ibmxscdf/backend
npm install
```
3. **Start server**
In the same directory,
```bash
npm start
```
Now the server should be running in `localhost:3001`
4. **npm install for React app** 
Open up a seperate terminal.
```bash
cd ../React
npm install
```
5. **Start React app**
In the same directory,
```bash
npm start
```
Now the webapp should be running in `localhost:3000`.
6. **Open localhost:3000**
By opening up `http://localhost:3000` in browser, the IOT registration page is available. For demo purpose, we have placed a link to access webcam which will be acting like the cctv camera in this demo. 

## Live demo 

You can find a running system to test at [kampung.herokuapp.com](https://kampung.herokuapp.com/).

## Built with (done but need to verify)

* [IBM Watson Studio???](https://cloud.ibm.com/catalog/services/watson-studio) - Platform used to generate object recognition model
* [React App](https://reactjs.org/) - Library used to build user interface (website for IOT configuration) 
* [Next.JS](https://nextjs.org/) - React Framework to build user interface (website for Partners or volunteers)
* [Node.JS](https://nodejs.org/en/about/) - Server using Javascript runtime environment
* [Express](https://expressjs.co  m/) - The web framework used for Node.js
* [MongoDB](https://www.mongodb.com/) -Used as main Database
* [Cloudinary](https://rometools.github.io/rome/) - Used for Object Storage
* [Heroku](https://www.heroku.com/) - Used for Deployment

## Versioning

We used [GitHub](https://github.com/) for versioning.

## Authors
* **Goh Zhong Han** - [zonghangoh](https://github.com/zonghangoh)
* **Ko Seoyoon** - [rsykoss](https://github.com/rsykoss)
* **Latrecia Wee** - [lat-9988](https://github.com/lat-9988)
* **Ng Xin Ping** - [myystxx](https://github.com/myystxx)

* **bourdakos1 && justinthec** - *Initial template* - [object-detection-react](https://github.com/cloud-annotations/object-detection-react)

See also [commits](https://github.com/rsykoss/ibmxscdf/commits/master) made in this project.

## Acknwledgement & License

The template for this project is from (github.com/cloud-annotations/object-detection-react)[https://github.com/cloud-annotations/object-detection-react] which has a license:
```
MIT License

Copyright (c) 2019 Nick Bourdakos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
