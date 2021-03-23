# Landing Page Project

## Table of Contents

* [Instructions](#instructions)
* [Navbar](#navbar)
* [Active Sections](#Active-sections)
* [Scrolling to sections](#Scrolling-to-sections)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.

## Navbar:

The navbar consists of an ordered list whose list items are added dynamically by querying the document for section tags and using their dataset attribute to set the text content of the list item.

The navbar doesn\'t wait for an event to be fired to be built, it is built once the app.js file is loaded.

## Active sections:

Once a scroll event is triggered by the user, the sections are looped over and the sections at the top of the view port is determined. The old top section is `deactivated` and the new top section is `activated`. If both the new and the old top sections are the same then nothing changes.

## Scrolling to sections:

Once a click event is triggered because a user clicked a list item in the navbar, the section, the list item is reffering to, is determined and scrolled to.
