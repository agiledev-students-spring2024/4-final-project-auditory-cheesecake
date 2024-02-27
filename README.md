# Auditory Cheesecake

## Product Description

### Product Vision Statement
Auditory Cheesecake is a mobile-first web application that allows music enthusiasts to understand their personality traits based on their music taste, which is analyzed using NYU psychology research metrics.


Auditory Cheesecake is primarily aimed for use by college students who are looking to gain insights about their personalities based on their music tastes. By taking our personality assessment, the user will answer a series of questions abou their song preferences and will be presented with their personality analysis at the end of the assessment. They will be able to engage with their profile and learn more about their assessment results, along with having the opportunity to share their profiles across different social media platforms.

## Team Members:
+ Sam Chen - 
+ Francisco Cunningham - fctico11 on [Github](https://github.com/fctico11)
+ James Li - j4mesli on [Github](https://github.com/j4mesli)
+ Suha Memon - suhamemon1 on [Github](https://github.com/suhamemon1)
+ Ibrahim Sheikh - Ibrahimsheikh02 on [Github](https://github.com/Ibrahimsheikh02)

## History of Auditory Cheesecake

Throughout history, psychologists and philosophers have debated the following question: does music shape society or does society shape its music?

There is no doubt that music has evolved over time. Therefore, we can say that it has evolved with our changing societies (ie: your parents often don't share the same taste in music as you). Plato and Aristotle argued that music shapes society and that bad music can be detrimental to mankind. However, contemporary psychologists, such as Steven Pinker, claim that music is like auditory cheesecake, in that it is biologically useless and manifests as the byproduct of other evolved phenomena.

There is more data that suggests that society shapes music, and our app is built on this fundamental idea. Our goal is to allow individuals to gain insights into their personalities by evaluating their unique music tastes. For this project, we will be developing algorithms to help us do just that and providing our users with an interactive and engaging user-facing tool to do so.

Our models of assessment that we are using to create our algorithms are based on research data that we have collected at the NYU Fox Lab. We hope that our understanding of how music impacts personalities can serve as a means to evaluate personalities of other individuals, thereby having tangible real-world applications.

### Contributing to our project:
For details on how to contribute, please navigate to [CONTRIBUTING.md](./CONTRIBUTING.md)

## Instructions for building and testing


In order to build and test this project, you will need to first get the code, build and launch teh database, build and launch the back-end, build and launch the front-end, and finally visit the web-app in your web browser. 


### Get the code
1. Fork this repository 
2. Clone your fork of this repository to your local machine
3. Navigate into the project directory

### Build and launch the database

- Install and run [docker desktop](https://www.docker.com/get-started)
- Create a [dockerhub](https://hub.docker.com/signup) account
- Run command, `docker run --name mongodb_dockerhub -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:latest`

The back-end code will integrate with this database. 

### Build and launch the back end

1. Navigate into the `back-end` directory
2. Run `npm install` to install all dependencies listed in the `package.json` file.
3. Run `npm start` to launch the back-end server

### Build and launch the front end

1. Navigate into the `front-end` directory
2. Run `npm install` to install all dependencies listed in the `package.json` file.
3. Run `npm start` to launch the React.js server

### Visit the web app in your web browser

- Navigate your web browser to http://localhost:7002

### Additional links
This project is based on an NYU psychology research paper from the NYU Fox Lab: [From Plato to Pinker: Measuring the Tastiness of Auditory Cheesecake](./assets/Final_From_Plato_to_Pinker__Measuring_the_Tastiness_of_Auditory_Cheesecake.docx.pdf). Please read the research paper if you wish to gain further insights on how our personality analysis algorithms operate.

<!-- >
This repository will be used for team projects.

Several sets of instructions are included in this repository. They should each be treated as separate assignments with their own due dates and sets of requirements.

1. See the [App Map & Wireframes](instructions-0a-app-map-wireframes.md) and [Prototyping](./instructions-0b-prototyping.md) instructions for the requirements of the initial user experience design of the app.

2. Delete the contents of this file and replace with the contents of a proper README.md, as described in the [project setup instructions](./instructions-0c-project-setup.md)

3. See the [Sprint Planning instructions](instructions-0d-sprint-planning.md) for the requirements of Sprint Planning for each Sprint.

4. See the [Front-End Development instructions](./instructions-1-front-end.md) for the requirements of the initial Front-End Development.

5. See the [Back-End Development instructions](./instructions-2-back-end.md) for the requirements of the initial Back-End Development.

6. See the [Database Integration instructions](./instructions-3-database.md) for the requirements of integrating a database into the back-end.

7. See the [Deployment instructions](./instructions-4-deployment.md) for the requirements of deploying an app.