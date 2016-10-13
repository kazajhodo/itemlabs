# itemlabs

List of core edits.

In meanjs its fine to edit the core module, however I'm trying to avoid this as much as possible to keep upgrades as seamless as I can. Below are things I changed within core or outside of my module that need to be done for the functionality to work properly:

Removed header within core/server/views/layout.server.view.html
Removed 'home' state from core/client/config/core.client.routes.js

# I only have my module included in the repo, these are dependencies for the install
Modules to install:
npm install lolapi --save
bower install angucomplete-alt --save



Purpose:
Create and compare itemsets on your favorite champions.

Currently working on search. Have champion names pulled from api creating an auto-complete search field.
When a champion is selected, data is returned for that champion from mongo.
