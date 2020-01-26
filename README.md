![](https://img.shields.io/github/package-json/v/kaskadi/kaskadi-textbox)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/kaskadi-textbox?color=blue)

**GitHub Actions workflows status**

<!--Uncomment if you're in a branch which is not master or release/*
![](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-textbox/testing?label=test)-->
<!-- This badge should only be used for master and release/* branches. Otherwise use the one above -->
![](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-textbox/build-on-firefox?label=firefox&logo=Mozilla%20Firefox&logoColor=white)
![](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-textbox/build-on-chrome?label=chrome&logo=Google%20Chrome&logoColor=white)
![](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-textbox/publish?label=publish&logo=AWS)

**CodeClimate**

![](https://img.shields.io/codeclimate/maintainability/kaskadi/kaskadi-textbox)
![](https://img.shields.io/codeclimate/tech-debt/kaskadi/kaskadi-textbox)
![](https://img.shields.io/codeclimate/coverage/kaskadi/kaskadi-textbox)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/kaskadi-textbox)](https://lgtm.com/projects/g/kaskadi/kaskadi-textbox/?mode=list&logo=LGTM)


****



# Creating a new Element

**Checklist (delete items when done)**
- create a new repository and choose this as the template
- clone the new repository to a local working copy
- set up secrets ([help](#Set-secrets-up))
- add the new repository to:
  - _CodeClimate_ ([help](#Add-the-element-repository-on-CodeClimate))
  - _LGTM_ ([help](#Add-the-element-repository-on-LGTM))
- install all dependencies via `npm i`

**Attention:** if you wish to use kaskadi's CLI tools, make sure to have `kaskadi-cli` installed globally (`npm i -g kaskadi-cli`)

## Set secrets up

Before pushing for the first time, please setup secrets on this repository.

**Steps:**
- go to your [repositorys secrets setting](../../settings/secrets)
- click on _Add a new secret_ for each secret you want to add

**What secrets need to be set:**
- `AWS_KEY_ID`
- `AWS_KEY_SECRET`
- `REPORTER_ID`

For `AWS_KEY_ID` & `AWS_KEY_SECRET` those are the credentials of the `kaskadi-public-push` user.
For `REPORTER_ID`: this is the ID of the reporter associated with this repository on _CodeClimate_

## Add the element repository on [_CodeClimate_](https://codeclimate.com)

**Steps:**
1. log into your dashboard on [_CodeClimate_](https://codeclimate.com/dashboard)
2. pick the correct organization
  - kaskadi for closed source projects
  - Open source otherwise
3. click on `Add a repository`
4. once the list of repositories is visible, click on `Add Repo` next to the repository you would like to add on _CodeClimate_

**But, how can I find my reporter ID?**

1. go into the repository you would like to set test coverage reporting for
2. click on `Repo Settings` in the top navigation bar
3. click on `Test coverage` in the menu on the left side
4. you can now copy the _TEST REPORTER ID_ and use it as secrets (`REPORTER_ID`) in your repository to setup automated test coverage reporting!

## Add the element repository on [_LGTM_](https://lgtm.com)

1. log into your dashboard on [_LGTM_](https://lgtm.com/dashboard)
2. review if the repository you would like to add is already tracked
3. **if the repo is not added automatically**: copy the URL of your repository root and paste it on your _LGTM_ dashboard in the `Follow a project from a repository host` field.

**Note:** By following a repository, this should setup a watcher on your GitHub account/organization and automatically add any active repositories on your _LGTM_ dashboard. This is why your newly created repository may already be tracked on your _LGTM_ tracker.
