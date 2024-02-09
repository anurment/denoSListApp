# Shopping-lists

## Web application for creating and modyfying shared shopping lists
[Click here for online version of the app](https://anurment-wsd-courseproject-1.onrender.com/)

(The application is ran on a free tier server that is shutdown if the application is not used for a while. Please wait a while if the server needs to be restarted.)

### Prequisites:

#### Docker and Docker Compose
* The app requires [docker](https://www.docker.com/get-started/)
 and [docker compose](https://docs.docker.com/compose/) 
to be installed.

### Application usage:
This Deno application can be used to create shopping lists, adding items to the shopping lists and then modyfying the shopping lists.

#### Some properties of the app:
* No login required
* User can create a new shopping list and deactivate existing ones.
* User can add items to the shopping lists and mark items as collected.

### Launching the application

Launching the application starts the Deno application, a PostgreSQL server and a database migration process (flyway).

#### To start the application:
1. Navigate to the folder containing the `docker-compose.yml` file.
2. Type `docker compose up`.
3. Access the application from browser: address: `localhost:7777`

#### To stop the application:
1. Press ctrl+c (or similar) in the same terminal where you started the application.
OR
2. Open a new terminal, navigate to the folder with the `docker-compose.yml` file 
and type `docker compose stop`.


### Database

When the database container `database-p1-8148f552-a160-4410-af87-07d05afc01dd` is running, you
can access the database from the terminal by typing:
docker exec -it database-p1-8148f552-a160-4410-af87-07d05afc01dd psql -U username database

This opens up `psql` console, where you can write SQL commands.

### Database migrations

When the application is started, SQL commands inside the `flyway/sql` -folder are executed.
The default SQL commands include for e.g creation of the required tables and adding an admin user to the database.
If you need to alter the database schema, you need to make a new file in the folder and restart the application.
One can also modify the existing file but then needs to clear the docker volumes with the command
`docker compose down -v`.

### Deno cache
The application uses the `shopping-lists-cache`-folder for storing the application dependencies.
Clear this folder if you want to clear the cache.

### The project.env and test.env files
Database configurations for the application and test environments are stored in the .env files project.env and test.env respectively.

### Testing the application
The folder `e2e-playwright` provides a configuration for running some end-to-end tests. One can use a separate testing environment
 to ensure that the "production" database is not altered during testing.

Launching the tests:
1. Navigate to the folder containing the `docker-compose-test.yml`-file.
2. Type `docker compose -f docker-compose-test.yml run --entrypoint=npx  e2e-playwright playwright test && docker compose -f docker-compose-test.yml rm -sf`

The command builds a separate environment for testing and then removes the built containers. NOTE:
The removal only happens if the tests are successful.
