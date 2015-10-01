# StreetQuiz
A simple street quiz.  
Currently only available for the city "Fürstenfeldbruck" near Munich.

## Instructions
After a click on 'start', you will see names of streets and buildings in the top bar.

Now you can try to place a marker as close as possible to given street or building. A marker is placed by a click on the map.
After you made a decision, you can click on 'solve'. This will check your answer and show the solution.

For your answer you gain or lose points. In case your answer is closer than 50 meters to the street or building, you gain 10 points. Otherwise you lose 1 point for each meter, which your answer is away from the solution.

You can see your current score in the panel on right.

## Download and build
You are free to download this project and edit it. We used the build-tool [Fly](https://github.com/flyjs/fly), which is based on [node.js](https://nodejs.org/).

After you downloaded the project you just need to run following command in the project direcory
```
npm install
```
Additonally you will need map tiles. You can create them by yourself or you can use our [custom map tiles](http://nigru.github.io/StreetQuiz/tiles.zip). Just extract the tile folder into the project root directory and run
```
fly tiles
```
or extract it to "project-root/dist/tiles/".

Now you can build the project with following command
```
fly build
```
This will create a build without the dev tool. To build the project including the dev tool run:
```
fly dev
```
The dev tool can be activated in bottom right of the app. It shows you an overview all streets and buildings, which can be shown on the map.

Alternativly you can run
```
fly
```
This watches for changes in the project and automatically builds it.

