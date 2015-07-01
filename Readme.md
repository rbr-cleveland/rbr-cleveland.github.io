# Administration

Add users to the rbr-cleveland github group to allow editing.

## Edit Content

1. go to http://prose.io to edit
2. choose 'authorize github application'
3. Choose to authorize the app, and be sure to allow the 'rbr-cleveland' organization
4. Edit FAQ items and other content in ``_posts/`` using the markdown editor and the metadata tab on the right. Create new items using the 'add' button when looking at the appropriate folder.
5. Edit configuration and sitewide texts in ``_data/`` (be nice to the yaml formatting! all spaces and such must remain intact)


## Edit Service Areas

1. go to http://geojson.io/ to edit
2. Click 'login' in the top right
3. Authorize the geojson.io application and allow access to rbr-cleveland, as above.
4. Now, choose 'Open' > 'Github'
5. Select the rbr-cleveland org, the rbr-cleveland.github.io repository, and then go to geoms and choose residential/commercial.
6. To make edits, Choose the 'edit layers' icon above the trash icon on the toolbar in the top right of the map
7. Use it similarly to how any polygon editor is to be used - clicking on the line creates new nodes, etc.
8. Click 'save' next to the 'edit layers' icon to save changes to the polygon.
9. Once complete, click 'Save' in the top toolbar, and provide a revision message.
10. You should see a message 'Changes committed to Github'. Yay!

# Technologies Used:

* Angular.js
* Jekyll
* Bootstrap UI
* Various Jquery plugins
* Yerba Mate & Rising Star Coffee
