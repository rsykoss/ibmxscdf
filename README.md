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

![Roadmap](roadmap.jpg)

## Getting started (doing)
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
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
### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be, for example

```bash
export TOKEN="fffd0923aa667c617a62f5A_fake_token754a2ad06cc9903543f1e85"
export EMAIL="jane@example.com"
dnf install npm
node samplefile.js
Server running at http://127.0.0.1:3000/
```

And repeat

```bash
curl localhost:3000
Thanks for looking at Code-and-Response!
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests (we dont have?)

Explain how to run the automated tests for this system

### Break down into end to end tests (we dont have?)

Explain what these tests test and why, if you were using something like `mocha` for instnance

```bash
npm install mocha --save-dev
vi test/test.js
./node_modules/mocha/bin/mocha
```

### And coding style tests (we dont have?)

Explain what these tests test and why, if you chose `eslint` for example

```bash
npm install eslint --save-dev
npx eslint --init
npx eslint sample-file.js
```

## Live demo (havent)

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

## Contributing (not yet)

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning (not yet)

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors (not yet)

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/Code-and-Response/Project-Sample/graphs/contributors) who participated in this project.

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
