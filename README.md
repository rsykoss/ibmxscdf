# Kampung App 
A comprehensive IT solution to increase the efficiency of the current alert system for quicker response to incidents involving elderly. Our team name, Kampung App, was named with an ideal of involving the community or "Kampung" in local slang. The team comprises of Zong Han, Seoyoon, Xin Ping and Latrecia. We are all students who have a passion for using technology for the betterment of society.


## Contents (need to finalise)

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Contributing](#contributing)
1. [Versioning](#versioning)
1. [Authors](#authors)
1. [License& Ack](#Acknowledgement & License)

## Short description

### What's the problem? 

With the increasingly aging population, it is no surprise that the elderly population (aged 65 and above) is the age group that SCDF received the most calls from. The elderly injuries are mainly due to falls and the highest frequency of occurrence is within their homes. This prove to be a challenge to the current alert system that hinges on manual reports be it by the community or the elderly himself. This might not be possible under certain scenarios i.e being unconscious. 

### How can technology help? 

Technologies can help to streamline the contact and response process between the major stakeholders, namely SCDF and CFRs and other companies who wish to collaborate. Traditional contact procedure like the need of making a phone call for reporting an incident can be automated.

### The idea 

Our team chose to work on problem statement, A by automating the processes involved in an incident report from the detection of an incident to the eventual reporting of the incident to the relevant stakeholders. We plan to make use of technologies like embedded IOTs as well as IBM Cloud and Watson service to detect incidents more accurately.  The SCDFs and CFRs will be able to shorten their response time by using our intuitive interface that would be linked to the automated detection system. 

## Demo video (not done yet)

[![Watch the video](https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/IBM-interview-video-image.png)](https://youtu.be/vOgCOoy_Bx0)

## The architecture (not done yet)

![image](https://user-images.githubusercontent.com/42865415/84589124-3440a780-ae5f-11ea-944c-76f11c65a500.png)

1.	The IBM Cloud object storage is for storing of the images used by the IBM Watson Machine Learning.
2.	IBM Watson Machine learning service then provides a trained model 
3.	The trained model which will be used by the IOTs such as CCTVs or sensors in order to detect frequent accidents type and severity.
4.	The elderly will be monitored real-time by the IOTs. 
5.	When a major accident takes place, the SCDFs will be notified immediately, together with a live image capture of the situation for their assessment.
6.	When a minor accident takes place, information would be sent to the express server instead.
7.	The information would then be package and sent through telegram.
8.	The telegram app would then notify the CFRs / volunteers.
9.	Other companies can build upon this system by connecting to the IOT. 


## Project roadmap
![image](https://user-images.githubusercontent.com/42865415/84589116-2c810300-ae5f-11ea-847b-5936e49469a1.png)

## Getting started
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
You can find a running system to test below:

* [frontend]( https://zonghan.now.sh/)
  Do try to sign up through telegram and test the api. We also provide API integrations
* [backend](https://kampung-api.herokuapp.com/)
  Try going to the cctv page to mock live cctv that triggers request to telegram when in danger. 


![image](https://user-images.githubusercontent.com/42865415/84589969-17a76e00-ae65-11ea-83bf-929b1b55e48d.png)
![image](https://user-images.githubusercontent.com/42865415/84589978-2c840180-ae65-11ea-974b-dfefc46017d6.png)
![image](https://user-images.githubusercontent.com/42865415/84590019-81277c80-ae65-11ea-9f28-e1be0e834b66.png)




## Built with (done but need to verify)

* [IBM Watson Machine Learning](https://www.ibm.com/sg-en/cloud/machine-learning - Machine learning instance to train models
* [IBM Cloud Object Storage](https://www.ibm.com/sg-en/cloud/object-storage) - Used for machine learning Object storage
* [React App](https://reactjs.org/) - Library used to build user interface (website for IOT configuration) 
* [Next.JS](https://nextjs.org/) - React Framework to build user interface (website for Partners or volunteers)
* [Node.JS](https://nodejs.org/en/about/) - Server using Javascript runtime environment
* [Express](https://expressjs.com/) - The web framework used for Node.js
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

## Acknowledgement & License

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
