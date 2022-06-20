# Crescendo Skills Test

When I got the email to the skills test, I was excited to begin and didnt read through the whole instructions well enough. So I began creating my own REST API to import the Crescendo supplied JSON file.

Upon returning to the instructions, I noticed that the json-server was to be used as the source for the data. I cloned the repo on my Ubuntu 20.04 and it ran but I couldnt access the server from outside the linux machine on port 3000. Then I cloned the repo on my Windows machine and all was fine. But I eventually chose to just use the BitBucket data.json file as my endpoint.

I know that I didnt follow the instructions that well - I was just so excited to put together this application. Knowing that this didnt look good on me, I chose to continue on my own path becasue I havent been in a creative mode for so long and wanted to get something built.


## This Repo
This repository contains two applications.

Node REST API -------------------------------------

Although not requested in the request, I have the beginnings of a REST API I was going to use for the backend. 
A Sqlite3 database is being used for data persistance. Functionality to import the data from the Crescendo 
Bitbucket repo into seperact tables.

This is not finished but is a good start.

React front end -----------------------------------

This React application is using Axios to fetch the data but there is commented code to do the same using fetch.
On the Home page, the data is requested and basic Tailwind CSS is used to visually show each recipe. With a 
linked image (medium) to a detail page. On the detail page, the selected recipe uuid is used as a parameter to 
show the useState data aquired on the home page.

