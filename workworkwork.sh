#!/bin/bash

REPO_NAME="boilerplate"
REPO_PATH="`dirname \"$0\"`"                # relative path
REPO_PATH="`( cd \"$REPO_PATH\" && pwd )`"  # absolutized and normalized path

echo -e "\n\e[96mStarting a guake tab for server..."
guake -n "$REPO_PATH" -r "$REPO_NAME server" -e "npm run start-pm2 && pm2 monit"

echo -e "Starting a guake tab for webpack..."
guake -n "$REPO_PATH" -r "$REPO_NAME dev" -e "npm run dev"

echo -e "Starting a guake tab for git..."
guake -n "$REPO_PATH" -r "$REPO_NAME git" -e "git status"

echo -e "\e[39m\e[49m"
