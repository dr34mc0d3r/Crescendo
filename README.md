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

## Thoughts

This application was a good all around assignment. It utalized many real world concepts and with these concepts - most applications can be constructed.

react-router-dom for multiple page navigation routing. Also passing parameters from one page to the next.

useState for storing the data and making it accessable to any route in the application without having to make new network calls to re-aquire the data.

JSX inline code - using a inline function to return data. And using object.map on the return for multiple items in the return.

## More about me

Im a backend developer at heart - hence the initial desire to build my own REST API.

I have only personal experiance with React - but I so much enjoy it more than Angular.

Im more of a builder than a painter. I can make things work - but they dont look pretty. But Im wanting to learn CSS more so I can enjoy attractive builds.

## Thank you for your consideration, Id love to be working with a team who builds these type of applications.

