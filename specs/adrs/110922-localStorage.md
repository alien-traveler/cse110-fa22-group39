# Use localStorage to store users' data

## Context and Problem Statement
Whether JSON or localStorage should be used to store users' data permanently. 

## Considered Options

* localStorage
* JSON

## Decision Outcome

LocalStorage is more familiar to us. It is also easy to operate with because our project follows the principle of "local first", while we, as developers, can easily access/modify the data stored in localStorage among different pages. 