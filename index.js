const core = require('@actions/core');
const github = require('@actions/github');
const myToken = core.getInput("repo-token");
const octokit = new github.GitHub(myToken);
const context = github.context;
const repoName = context.payload.repository.name;
const ownerName = context.payload.repository.owner.login;
const issueNumber = context.payload.issue.number;

const volunteerMessage = core.getInput("volunteer-message");
const labelName = core.getInput("label-name")
const labelColor = core.getInput('label-color')
const labelDesc = core.getInput('label-desc')

async function comment() {
    await octokit.issues.createComment({
        issue_number: issueNumber,
        owner: ownerName,
        repo: repoName,
        body: 'Hey there stranger, if you\'d like to volunteer for working on this issue, comment <br />```' + volunteerMessage + '```<br /> and I\'ll show you as a volunteer for this issue by labelling.'
    })
    return 'Commented on new issue'
}

async function commentVolunteer() {
    await octokit.issues.createComment({
        issue_number: issueNumber,
        owner: ownerName,
        repo: repoName,
        body: '@' + context.payload.sender.login + ' has volunteered for working on this. Wish them luck!'
    })
    return 'Set up a volunteer'
}

async function addLabel() {
    await octokit.issues.addLabels({
        owner: ownerName,
        repo: repoName,
        issue_number: issueNumber,
        labels: [labelName]
    })
    return 'Added Label'
}

async function createLabel() {
    try {
        await octokit.issues.createLabel({
            issue_number: issueNumber,
            owner: ownerName,
            repo: repoName,
            color: labelColor,
            name: labelName,
            description: labelDesc,
        })
        return 'Created label'
    } catch (error) {
        return 'Already exists'
    }
}

if (github.context.eventName == "issues") {
    console.log("Issues event")
    comment().then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}
else if (github.context.eventName == "issue_comment") {
    console.log("Issue Comment event")
    if (context.payload.comment.body.toLowerCase().includes(volunteerMessage.toLowerCase())) {
        createLabel().then(res => {
            console.log(res)
            addLabel().then(res => {
                console.log(res)
                commentVolunteer().then(res => {
                    console.log(res)
                }, err => {
                    console.log(err)
                })
            })
        }, err => {
            console.log(err)
        })
    }
}
