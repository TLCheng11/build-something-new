# Build 3D

- A dedicated website for everyone to build, share and download 3D models with sophisticated UI.
- Deployed website: [buildsomethingnew.herokuapp.com](https://buildsomethingnew.herokuapp.com/)

## Creator

- [Tony Cheng](https://github.com/TLCheng11)

# Descriptions

- Constructed a 3D model design platform that incorporated the React Three libraries - fiber, drei, and cannon. Users can design their own 3D models using the custom-built UI.
- Designed custom algorithms and recursive functions to join individual components into groups, allowing users to reposition or copy multiple model components easily.
- Modeled custom database and REST API with Active Record, Active Storage, and PostgreSQL. With all the data stored, users can share their creations, or download and leave comments on others' creations.
- Monitored all users' activities when editing the model with useEffect and useRef Hooks. All the changes that users made will be auto-saved to the database.
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
