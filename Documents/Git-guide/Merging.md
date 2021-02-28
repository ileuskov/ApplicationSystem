# Here are some best practices to commit and merge branches in git

# 1. Always use branches to work on features

If you want to create a new page, feature or just add some code use branches for that. That will help us to review the code before you commit it on master


# 2. What is a branch?

if you clone our repository and open it in terminal you can always type 'git branch'. 
Then you can always know which branch you are currently on.
By deafult you are always on main(master) branch. This is a branch where we store our reviewed, final code. Here we are supposed to have clean and correctly working code. 
No experiments over here please, otherwise we lose our working code


# 3. How to create a branch?

# 1) Open our git repo in your editor (VS Code or anything you use) and type:

'git branch' - you should be on the main(master) branch


# 2) Create new feature branch and get there

git checkout -b feature/some-new-cool-stuff
Example: you want to create a new info page, then you type: git checkout -b feature/info-page

# 3) Once you are done with your work, open a pull request by merging your branch into master(main). 
Do this not after every commit but rather when you think are done with this branch and want to publish your code to master

# checkout your target branch (where you want to push your changes)

git checkout master

# fetch from and integrate with remote repository (update your local master in case someone has added some new features there already)

git pull --rebase

# checkout your feature branch (now open the branch you are currently working on)

git checkout feature/some-new-cool-stuff

# fetch from and integrate with remote repository (update your branch in case someone is working there as well)

git pull --rebase

# resolve merge conflicts ( = try to merge your branch)

git merge --no-ff master

# check your editor (VS Code or anything else) and see whether there are any merge conflicts. 

If so, resolve them first

# no merge conflicts? then you are good to go and can commit your changes now

git commit

# push to remote

git push origin feature/some-new-cool-stuff (or just git push if you have already pushed it to the origin before)


# 4) Check our github repo and look for Pull Requests


# There you should see your pull request with your branch

Now ask any developer to make a code review for you. He/she can do it right there at the GitHub Pull Request page

# Look at the code review and correct your mistakes / fix issues


# 5) Everything reviewed and approved?

# then just click "Merge pull request"
