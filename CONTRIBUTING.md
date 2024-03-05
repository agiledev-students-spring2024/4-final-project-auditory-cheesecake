# Guide to Contributing
Each member of our team will be following the steps below to contribute to our project. The steps are outlined from the very first step of cloning the main repository, down to the details for how we must make changes to our repository.

## 1) Clone the main repository:
1. Navigate to the main repository on GitHub.
2. Click on the "Code" button and copy the repository URL.
3. Open your terminal or command prompt and navigate to the directory where you want to clone the repository.
4. Run the following command to clone the repository: `git clone <repository_url>`
    - The name of our repository is https://github.com/agiledev-students-spring2024/4-final-project-auditory-cheesecake.git, so we would run the following command:
    - `git clone https://github.com/agiledev-students-spring2024/4-final-project-auditory-cheesecake.git`

## 2) Create your own branch:
1. After cloning the repository, navigate into the project directory: `cd <project_directory>`
    - Our project directory is named 4-final-project-auditory-cheesecake, so we would run the following command: 
    - `cd 4-final-project-auditory-cheesecake`
2. Run the following command to create a new branch: `git checkout -b <branch_name>`
    - Replace `<branch_name>` with your github username

## 3) Work on your branch:
1. Make the necessary changes, additions, or modifications to the codebase in your branch.
2. Use git add to stage your changes, and git commit to commit them with a descriptive message.
3. Issue pull requests when you need to commit:
4. Push your branch to the remote repository: `git push origin <branch_name>`
5. Navigate to the main repository on GitHub. You should see a prompt to create a new pull request for your branch.
6. Click on the "Create Pull Request" button.
7. Review the changes, add a descriptive title and comment explaining your changes.
8. Assign reviewers or teammates who should review your code.
9. Once reviewed and approved, your changes can be merged into the main branch.
10. Update your branch to reflect the main branch:

## 4)After your changes have been merged into the main branch, or if the main branch has been updated by others, you'll need to update your local branch.

1. First, switch to the main branch: git checkout main
2. Pull the latest changes from the remote repository: `git pull`
3. Switch back to your branch: `git checkout <branch_name>`
4. Merge the latest changes from main into your branch: `git merge main`
5. Resolve any conflicts that may arise during the merge process.