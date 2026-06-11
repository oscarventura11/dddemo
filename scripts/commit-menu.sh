#!/bin/bash

# Arguments from prepare-commit-msg:
# $1: Path to the file that holds the commit message
# $2: Source of the commit message (e.g., message, template, merge, squash)
COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2

# Only run the menu if the commit source is empty (e.g., standard "git commit")
if [ -z "$COMMIT_SOURCE" ]; then
    # Ensure interactivity
    exec < /dev/tty

    echo "--------------------------------------------------"
    echo "  Standardized Commit Message Menu"
    echo "--------------------------------------------------"

    options=(
        "feat: A new feature"
        "fix: A bug fix"
        "docs: Documentation only changes"
        "style: Changes that do not affect the meaning of the code"
        "refactor: A code change that neither fixes a bug nor adds a feature"
        "test: Adding missing tests or correcting existing tests"
        "chore: Changes to the build process or auxiliary tools and libraries"
    )

    PS3="Select the type of change: "
    select opt in "${options[@]}"; do
        case $opt in
            "feat: A new feature") type="feat"; break;;
            "fix: A bug fix") type="fix"; break;;
            "docs: Documentation only changes") type="docs"; break;;
            "style: Changes that do not affect the meaning of the code") type="style"; break;;
            "refactor: A code change that neither fixes a bug nor adds a feature") type="refactor"; break;;
            "test: Adding missing tests or correcting existing tests") type="test"; break;;
            "chore: Changes to the build process or auxiliary tools and libraries") type="chore"; break;;
            *) echo "Invalid option. Please try again.";;
        esac
    done

    echo ""
    read -p "Enter a short description: " desc

    if [ -z "$desc" ]; then
        echo "Description cannot be empty. Aborting commit."
        exit 1
    fi

    COMMIT_MSG="$type: $desc"

    if [ -n "$COMMIT_MSG_FILE" ]; then
        echo "$COMMIT_MSG" > "$COMMIT_MSG_FILE"
        echo "--------------------------------------------------"
        echo "✅ Commit message set: $COMMIT_MSG"
        echo "--------------------------------------------------"
    else
        echo "No commit message file provided. Printing message:"
        echo "$COMMIT_MSG"
    fi
fi
