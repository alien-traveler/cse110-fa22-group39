# Add a Staging branch

## Context and Problem Statement

Before finalized all the code on the main branch, we need another branch to preview all the auto-changed styles and comments (docs).

## Considered Options

- Staging branch
- Manually review

## Decision Outcome

A staging branch is added to github because we can apply github actions such as prettier code and code scanning (and most importantly, JSDoc the auto-generated documentation tool) to that branch. We can then review the effects on the staging branch instead of risking our code by pushing to the main branch directly.
