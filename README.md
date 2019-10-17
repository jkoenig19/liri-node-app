# liri-node-app

## Introduction
This app allows a user to find information on concerts, songs. and movies through one app rather than three apps.

## Overview
This app allows for four user input commands: concert-this, spotify-this-song, movie-this, and do-what-it-says.

## Instructions
For each machine a user wishes to use this app on, the user must create their own .env file with their own Spotify Client ID and Spotify Client Secret values in order to use this app. Then on the terminal command line, a user must load the following: npm i node-spotify-api, npm i axios, npm i moment, and npm i dotenv.

The following two or three steps must be performed together to run this app. First, from the terminal command line, a user must type node liri.js. Secondly, following this on the same line, a command must be typed, either concert-this, spotify-this-song, movie-this, or do-what-it-says. Thirdly, still on the same line, for concert-this, spotify-this-song, or movie-this, these commands must be followed by the corresponding command selection, either <artist/band name>, <song name>, or <movie name> respectfully.  For the command do-what-it-says, the third step is not needed.  The do-what-it-says command randomly uses a command and corresponding selection defined in the random.txt file.

## Link
The app is available at https://github.com/jkoenig19/liri-node-app.

## List of Technologies Used in the App
This app is a Node application built with JavaScript.  It uses the axios, moment, fs, node-spotify-api, and dotenv packages.

