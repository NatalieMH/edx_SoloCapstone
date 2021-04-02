# edx_SoloCapstone
- [Summary](#summary)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [What Do We Test](#what-do-we-test)
- [How Do We Test](#how-do-we-test)
  - [Page Objects](#page-objects)
 

## Summary

This project was put together to test the website Edx.org. This is an educational website where lifelong learners can sign up to either audit courses or pay for verified certificates for courses on a wide array of subject from top universities.

## Setup

This is how to set up my project.

1. clone it!
1. `npm i`

## Running Tests

To run all the tests, use the command: `npm jest edx`

To run a specific test, use the command: `npx jest edx.test.ts` or `npx jest edxFilter'

## What Do We Test

Test searching for any topic, filtering by: Subject, Partner, Program, Level, Availability, or Language. Test signing in and enrolling in a course and navigating within a course. Test expanding sections within a course. Test switching the website between English and Spanish.

## How Do We Test

I organized my tests by filters on edxFilters.test.ts and tests related to signing in, enrolling, and navigating courses on another test edx.test.ts.

### Page Objects

A page object edxBase.ts was created to include methods for signing into the website, clicking items, navigating to the website, searching, and removing the cookies banner.

