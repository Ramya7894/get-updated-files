// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const vscode = require('vscode');
const simpleGit = require('simple-git');

function getUpdatedFiles(repositoryPath) {
  return new Promise((resolve, reject) => {
    const git = simpleGit(repositoryPath);
    git.diffSummary((err, summary) => {
      if (err) {
        reject(err);
        return;
      }
      const updatedFiles = summary.files.map((file) => file.file);
      resolve(updatedFiles);
    });
  });
}
function activate(context) {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	console.log(workspaceFolders);
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('get-updated-files.helloWorld',async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const updatedFiles = await getUpdatedFiles(workspaceFolders[0].uri.fsPath);
		console.log(updatedFiles);
		vscode.window.showInformationMessage(updatedFiles.join(', '));
	//vscode.window.showInformationMessage('Hello World from get-updated-files!');
	
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
