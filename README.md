<div align="center">

![hatch-logo](./assets/hatch-logo.png)
</div>


<details>
  <summary>📖 Table of Contents</summary>

- [💡 About Hatch](#-about-hatch)
- [🛠 Built With](#-built-with)
- [🔍 Sample Features](#-sample-features)
- [🚀 Getting Started](#-getting-started)
- [💬 Contact](#-contact)
- [📆 Project Timeline](#-project-timeline)
</details>


## 💡 About Hatch

<div align="center">

Hatch is an original virtual escape room designed by Michael Jung. This project utilizes various topics and concepts learned throughout the App Academy bootcamp program and implements them as clues to advance in the game.

[Github](https://github.com/michaelhjung/hatch) | [Live Link](https://escape-hatch.herokuapp.com/)

**AN IMPROVED 2.0 VERSION IS COMING SOON!**

</div>

<details>
<summary>📚 Project Wiki Links</summary>

* [🗄️ Backend API Documentation](https://github.com/michaelhjung/hatch/wiki/Backend-API-Documentation)
* [💾 Database Schema](https://github.com/michaelhjung/hatch/wiki/Database-Schema)
* [📖 User Stories](https://github.com/michaelhjung/hatch/wiki/User-Stories)
* [🗒️ Features List](https://github.com/michaelhjung/hatch/wiki/Features-List)
* [🏪 Redux State Shape](https://github.com/michaelhjung/hatch/wiki/Redux-Store-Shape)
* [🖼️ Wireframes](https://github.com/michaelhjung/hatch/wiki/Wireframes)
* [🎬 BTS/Game Walkthrough](https://github.com/michaelhjung/hatch/wiki/BTS-Game-Walkthrough-*SPOILER-WARNING*)
* [🙋 Why Hatch?](https://github.com/michaelhjung/hatch/wiki/Why-hatch%3F)

</details>

## 🛠 Built With

<div align="center">

👨‍💻 Frameworks, Platforms, & Libraries:

![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

🗃️ Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

🌐 Hosting:

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

</div>

<p align="right"><a href="#readme-top">⬆ back to top</a></p>


## 🔍 Sample Features

<div align="center">

  **Enter Room Animation**
  ![enter]

  **Interact with Room Elements to find Clues**
  ![interact]

  **Create, Read, Update, Delete Notes**
  ![notes]

  **Create, Read, Update, Delete Items**
  ![items]

  **Countdown Timer that Persists Across Refreshes or URL Changes**
  ![timer]

  **Re-enter Last-Entered Room**
  ![last-room]

</div>

<p align="right"><a href="#readme-top">⬆ back to top</a></p>


## 🚀 Getting Started

<details>

<summary>⚙️ Local Setup Instructions</summary>

1. Clone the repo:

    ```sh
    git clone git@github.com:michaelhjung/hatch.git
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

</details>


## 💬 Contact

<div align="center">

  [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/michael-h-jung/)
  [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/michaelhjung)
  [![Portfolio](https://img.shields.io/badge/Portfolio-255E63?style=for-the-badge&logo=About.me&logoColor=white)](https://michaelhjung.com)

</div>

<p align="right"><a href="#readme-top">⬆ back to top</a></p>


## 📆 Project Timeline

<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Accomplishments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sat, 10/22/2022</td>
      <td>
        <ul>
          <li>Decide on idea</li>
          <li>Start finding assets</li>
          <li>Create repo</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Sun, 10/23/2022</td>
      <td>
        <ul>
          <li>Come up with riddles/clues to implement</li>
          <li>Finish first draft of API documentation</li>
          <li>Create DB schema</li>
          <li>Draft redux store shape</li>
          <li>Draft features list</li>
          <li>Create wireframe</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Mon, 10/24/2022</td>
      <td>
        <ul>
          <li>Receive project approval</li>
          <li>Create logo</li>
          <li>Create all backend models</li>
          <li>Create backend API routes</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>10/25/2022</td>
      <td>
        <ul>
          <li>Revise schema</li>
          <li>Add room images table</li>
          <li>Complete API routes for room images table</li>
          <li>Complete storyboarding</li>
          <li>Create test seed data</li>
          <li>Create Postman tests for all backend routes</li>
          <li>Update wireframe</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Wed, 10/26/2022</td>
      <td>
        <ul>
          <li>Photoshop hero image</li>
          <li>Finish login/signup forms with error validations</li>
          <li>Complete demo user button</li>
          <li>Complete footer</li>
          <li>Complete profile button</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Thu, 10/27/2022</td>
      <td>
        <ul>
          <li>Implement all CRUD features for notes and items</li>
          <li>Complete Rooms and Event Logs reducers</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Fri, 10/28/2022</td>
      <td>
        <ul>
          <li>Complete game logic for rooms 1, 2, and 3</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Sat, 10/29/2022</td>
      <td>
        <ul>
          <li>Finish implementing logic for the remaining rooms</li>
          <li>Implement game initialization logic upon sign up (auto-creates all rooms with associated images and logs, starter notes and items)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Sun, 10/30/2022</td>
      <td>
        <ul>
          <li>Add cleanup functions</li>
          <li>Update splash page</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Mon, 10/31/2022</td>
      <td>
        <ul>
          <li>Finish hero image animation</li>
          <li>Implement reset game data button</li>
          <li>Update form labels to show when typing</li>
          <li>Update CSS</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Tue, 11/1/2022</td>
      <td>
        <ul>
          <li>Write game walkthrough wiki</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Wed, 11/2/2022</td>
      <td>
        <ul>
          <li>Create feature for returning to last-entered room</li>
          <li>Implement countdown timer</li>
          <li>Create 404 not found page</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#readme-top">⬆ back to top</a></p>


<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-icon]: https://skillicons.dev/icons?i=linkedin
[github-icon]: https://skillicons.dev/icons?i=github
[linkedin-url-michael]: https://linkedin.com/in/michael-h-jung/
[github-url-michael]: https://github.com/michaelhjung


[enter]: https://i.imgur.com/Fbw0f2h.gif
[interact]: https://i.imgur.com/2tVKIUV.gif
[notes]: https://i.imgur.com/byFhjLn.gif
[items]: https://i.imgur.com/BHB6VrW.gif
[timer]: https://i.imgur.com/A6v1APy.gif
[last-room]: https://i.imgur.com/l1DxsxS.gif
