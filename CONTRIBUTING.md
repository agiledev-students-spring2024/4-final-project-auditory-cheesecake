# Guide to Contributing

### 1) Clone the main repository:
Navigate to the main repository on GitHub.

Click on the "Code" button and copy the repository URL.

Open your terminal or command prompt and navigate to the directory where you want to clone the repository.

Run the following command to clone the repository: git clone <repository_url>


### 2) Create your own branch:

After cloning the repository, navigate into the project directory: cd <project_directory>

Run the following command to create a new branch: git checkout -b <branch_name>

Replace <branch_name> with a descriptive name for your branch, such as your github username


### 3) Work on your branch:

Make the necessary changes, additions, or modifications to the codebase in your branch.

Use git add to stage your changes, and git commit to commit them with a descriptive message.

Issue pull requests when you need to commit:

Push your branch to the remote repository: git push origin <branch_name>

Navigate to the main repository on GitHub.

You should see a prompt to create a new pull request for your branch.

Click on the "Create Pull Request" button.

Review the changes, add a descriptive title and comment explaining your changes.

Assign reviewers or teammates who should review your code.

Once reviewed and approved, your changes can be merged into the main branch.

Update your branch to reflect the main branch:

### 4)After your changes have been merged into the main branch, or if the main branch has been updated by others, you'll need to update your local branch.

First, switch to the main branch: git checkout main

Pull the latest changes from the remote repository: git pull

Switch back to your branch: git checkout <branch_name>

Merge the latest changes from main into your branch: git merge main

Resolve any conflicts that may arise during the merge process.