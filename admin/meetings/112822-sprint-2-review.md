# Reviewing the goal for the sprint

The goal is to check the overall progress on this project.

# Demonstrating new features implemented

### Front-end
Consistent styles for HTML, clean the code

- Tanya
    - Helped with creating the status video (recorded the audio)
    - Move Home button to left upper corner for every page (except common.html, customize.html, editThePreset.html, add the button if the page doesn’t have it)
    - Fix the uneven margin issue on preset-customize page
    - Make preset-customize, preset-list have consistent styles 

- Logan
    - Complete the redirection of save&continue and main button.
    - Add home button on the review page.
    - Reduce the margin between add-ons items
    - Make the ReviewRecipe page not editable (prevent users from writing to the data fields in the form)
    - Make CustomizeRecipe, ReviewRecipe have consistent styles

- Justin
    - Make savedRecipes, index have consistent styles
    - Make recipes in savedRecipes scrollable (e.g. overflow-y: scroll)
    - Rename every file into firstwordSecondword format (e.g. CustomizeRecipe -> customizeRecipe, preset-list -> presetList). Make sure page-redirection still works after renaming

- Mingyi
    - Fix the bug in the local storage for repeated recipes 
    - Fix the problem of adding new item but not editing old item
    - Create some recipes from preset/customized, make sure everything is loaded in savedRecipes page, and double check local storage
    - Create a staging branch & deploy the first version of our web 

### Back-end
- Randi
    - Add styles to your script.js files
    - Make a remove button next to each recipe and delete it (also delete its name in namesRecipe, corresponding item, and item in savedRecipes array in the local storage) if the user clicks remove
    - Implemented delete function in saved recipes section; commented my code.

- Jacky
    - Add styles to your script.js files
    - Review pull requests

- Ryan
    - Figure out which tests are the most appropriate for our web

- Harry
    - Figure out which tests are the most appropriate for our web
    - Looked at which features of the app are most crucial for its functionality and therefore have planned and created potential unit tests for them. 
    - Unit tests is as far as I have gotten and further tests will be considered in the next sprint.

- Will & Vladimir
    - Made the team status video
    - Keep track of canvas submissions
    - Run CI/CD pipeline on the current build
        - Remove Create Pull Request action
        - Install JSDoc action with github page
        - Install Codacy action (scanning tool)
    - Begin checking documentation requirements


# Discussing work not yet accomplished

Need to deploy the website, run pipeline again, and write some tests (Unit/E2E/UI). 
