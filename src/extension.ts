import * as vscode from "vscode";
import { content } from "./webViewContent";

export function activate(context: vscode.ExtensionContext) {
  console.log(" , Now you can enjoy reading the lyric of your favorite songs");

  const command = "extension.develyrics";
  const commandHandler = () => {
    const panel = vscode.window.createWebviewPanel(
      "develyrics",
      "Develyrics",
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );
    panel.webview.html = content();
  };

  context.subscriptions.push(
    vscode.commands.registerCommand(command, commandHandler)
  );
}

export function deactivate() {}
