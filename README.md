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
    <li><a href="#roadmap">Roadmap</a></li>
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
* [Backend API Documentation]()
* [Database Schema]()
* [Features List]()
* [Redux State Shape]()
* [Frontend Routes]()
* [User Stories]()


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

🚧🚧 This section is still under construction. 🚧🚧


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

<!-- ROADMAP -->
## Roadmap

🚧🚧 This section is still under construction. 🚧🚧

<!-- - [ ] User
    - [ ] Create a user account -->




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
