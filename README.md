# Build 3D

- A dedicated website for everyone to build, share and download 3D models with sophisticated UI.
- Deployed website: [buildsomethingnew.herokuapp.com](https://buildsomethingnew.herokuapp.com/)

## Creator

- [Tony Cheng](https://github.com/TLCheng11)

# Descriptions

- Constructed a 3D model design platform incorporating the React Three libraries - fiber, drei, and cannon. Users can design their own 3D models using the custom-built UI.
- Designed custom algorithms and recursive functions to join individual components into groups, allowing users to reposition or copy multiple model components easily.
- Integrated BCrypt for password encryption and user authentication, and used Cookies to make stateful HTTP requests.
- Modeled custom database and REST API with Active Record, Active Storage, and PostgreSQL. Through the API, users can share their creations, or download and leave comments on the creations of other users.
- Monitored all user's activities while they are editing the model with useEffect and useRef Hooks. All the changes that users make will be auto-saved to the database.
- Utilized JSZip and File-saver for users to download 3D models as a React component.


# System dependencies

- Ruby: 3.1.2
- Node: 16.17.1
- PostgreSQL: 12.12

# Configuration:

- Install packages:

  - bundle install
  - npm install --prefix client

- Database creation & initialization:

  - rails db:create db:migrate

- How to run the test suite:
  - rails s
  - npm start --prefix client
  - open [localhost:4000](http://localhost:4000/) on your browser
