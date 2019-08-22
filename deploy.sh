#!/bin/sh
###########################
# cd D:/wamp/www/yourProjectFolder
# switch to branch you want to use
git checkout master
# add all added/modified files
git add .
# commit changes
echo Enter Commit Message...
read commitMessage
git commit -am "$commitMessage"
# push to git remote repository
git push
###########################
echo Press Enter...
read