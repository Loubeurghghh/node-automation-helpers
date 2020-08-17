# Automation Helpers

This repository contains support classes for use throughout all automation projects.

## API Helper

Used for making API calls (currently using request-promise).  Offers POST, GET, PUT, DELETE and POST (with file) functionality without requiring the user to write a request themselves.

## ES (ElasticSearch) Helper

Executes search queries against an ElasticSearch database.

## JSON Helper

Offers the ability to load json files if given a filepath.

## Sleeper

Whilst this should generally be avoided, offers the ability to insert sleep statements in your code.

## SQL Helper

Runs SQL statements against a given database, currently only supports MySQL.

## Test Data Helper

Able to generate pseudorandom names/descriptions.

## Updating
Clone this repository

Checkout a new branch, preferably related to a ticket.

Make relevant changes, ensure that changes work.

Update version number by either 1, 0.1 or 0.0.1 dependent on size of change.

Create merge request into master.
