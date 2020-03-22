# Issue Volunteer
Ask anyone to volunteer for working on issues.

# Description
A bot comments on all new issues, asking the visitors if they would like to work on this issue.
![img/1](img/1.PNG?raw=true)

When the visitor comments their interest, bot adds a `volunteer` label and displays the person working
![img/2](img/2.PNG?raw=true)

## Inputs

### `repo-token`

**Required** repo token, can be passed using `{{ secrets.GITHUB_TOKEN }}`

### `volunteer-message`

**Optional** Comment message asking for volunteers

<b>default: </b>I am willing to work on this issue

### `label-name`

**Optional** Custom label name

<b>default: </b>volunteer

### `label-color`

**Optional** Custom label color

<b>default: </b>F79A41 (orange)

### `label-desc`

**Optional** Custom label description

<b>default: </b>Someone volunteered to work on this

## Example usage in workflow

```
on: [issues, issue_comment]
jobs:
  volunteer:
    runs-on: ubuntu-latest
    name: A job to get volunteers
    steps:
      - uses: actions/checkout@master
      - name: issuevolunteer
        id: issuevolunteer
        uses: JazibJafri/issue-volunteer@v1
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
          volunteer-message: "I will work"
          label-name: "volunteered"
          label-color: "001FFF"
          label-desc: "Someone is working"
```

## LICENSE 
MIT
