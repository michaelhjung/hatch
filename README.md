# Hatch
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#project-wiki">Project Wiki</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#sample-features">Sample Features</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#timeline">Timeline</a></li>
    <li><a href="#contact-michael">Contact Michael</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
![hatch-logo]

[hatch-logo]: ./assets/hatch-logo.png

<u><b>[Hatch](https://escape-hatch.herokuapp.com/)</b></u> is an original virtual escape room designed by Michael Jung. This project utilizes various topics and concepts learned throughout the App Academy bootcamp program and implements them as clues to advance in the game.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Project Wiki
* 🗄️[Backend API Documentation](https://github.com/michaelhjung/hatch/wiki/Backend-API-Documentation)
* 💾[Database Schema](https://github.com/michaelhjung/hatch/wiki/Database-Schema)
* 📖[User Stories](https://github.com/michaelhjung/hatch/wiki/User-Stories)
* 🗒️[Features List](https://github.com/michaelhjung/hatch/wiki/Features-List)
* 🏪[Redux State Shape](https://github.com/michaelhjung/hatch/wiki/Redux-Store-Shape)
* 🖼️[Wireframes](https://github.com/michaelhjung/hatch/wiki/Wireframes)
* 🎬[BTS/Game Walkthrough](https://github.com/michaelhjung/hatch/wiki/BTS---Game-Walkthrough-*SPOILER-WARNING*)
* 🙋[Why hatch?](https://github.com/michaelhjung/hatch/wiki/Why-hatch%3F)


### Built With
#### Frameworks, Platforms, & Libraries:
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

#### Database:
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

#### Hosting:
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SAMPLE FEATURES -->
## Sample Features

  - ### Enter Room Animation
    ![enter]
  - ### Interact with Room Elements
    ![interact]
  - ### Create, Read, Update, Delete Notes
    ![notes]
  - ### Create, Read, Update, Delete Items
    ![items]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

1. Clone the repo:

    SSH version:
    ```sh
    git clone git@github.com:michaelhjung/hatch.git
    ```
    or

    HTTPS version:
    ```sh
    git clone https://github.com/michaelhjung/hatch.git
    ```

2. Install packages
    ```sh
    pipenv install
    cd react-app
    npm install
    ```
3. Create a .env file and set the environment variables for SECRET_KEY and DATABASE_URL to your choosing.

4. Migrate and seed the files.
    ```sh
    flask run db init
    flask run migrate
    flask seed all
    ```
5. Run the server and start the react app
    ```sh
    pipenv run flask run
    cd react-app
    npm start
    ```

<!-- Timeline -->
## Timeline

| Date            |           Accomplishment           |
|:---------------:|:-----------------------------------|
| Sat, 10/22/2022 | decide on idea, start finding assets, create repo |
| Sun, 10/23/2022 | finish first draft of api documentation, db schema, list of riddles/clues to implement, redux store shape pseudocode, features list, wireframe |
| Mon, 10/24/2022 | receive project approval, create logo, create all backend models, backend forms, backend api routes |
| Tue, 10/25/2022 | revise schema, add room images table, complete api routes for room images table, complete storyboarding, create test seed data, create postman tests and tested all backend routes, update wireframe |
| Wed, 10/26/2022 | photoshop hero image, finished login/signup forms with error validations, demo user button, footer, profile button |
| Thu, 10/27/2022 | all CRUD for notes and items, finish Rooms and Event Logs reducers |
| Fri, 10/28/2022 | finished rooms 1, 2, & 3 game logic |
| Sat, 10/29/2022 | finished rest of rooms game logic, finished logic for game initialization upon sign up (auto-creates all rooms with associated room images and event logs, starter user notes, starter user items) |
| Sun, 10/30/2022 | add clean up functions for rooms, update splash page |
| Mon, 10/31/2022 | finish hero image animation, finish reset game data button, update form labels to appear when typing, update CSS |




<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact Michael
[![linked in][linkedin-icon]][linkedin-url-michael]
[![linked in][github-icon]][github-url-michael]


Project Link: [https://github.com/michaelhjung/hatch](https://github.com/michaelhjung/hatch)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-icon]: https://skillicons.dev/icons?i=linkedin
[github-icon]: https://skillicons.dev/icons?i=github
[linkedin-url-michael]: https://linkedin.com/in/michael-h-jung/
[github-url-michael]: https://github.com/michaelhjung


[enter]: https://i.imgur.com/kr9oAlp.gif
[interact]: https://i.imgur.com/2tVKIUV.gif
[notes]: https://i.imgur.com/lqMDkKJ.gif
[items]: https://i.imgur.com/1xvJVBy.gif
