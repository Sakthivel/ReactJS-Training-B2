$(".btn-primary.login").click(function(event) {
    var username = $('#username').val();
    if (username) {
        formSubmit(username);
    }
    event.preventDefault();
});

$(".btn-primary.add-issue-form").on('click', addIssueForm);
$(".back-result").on('click', backtoResult);

function addIssue(event) {
    var $el = $(event.currentTarget);
    hideRepos();
    issueFormShow();
    
    $('#user').val($el.data('name'));
    $('#repos').val($el.data('repo'));
}

function viewIssue(event) {
    var $el = $(event.currentTarget);
    hideRepos();
    issueListShow();
    issueView($el.data('name'), $el.data('repo'));
}

function addIssueForm() {
    hideRepos();
    $('h2.title').text('Add issue form');
    var title = $('#issueTitle').val();
    var description = $('#issueDescription').val();
    var user = $('#user').val();
    var repo = $('#repos').val();
    if (title && description) {
        issueSubmit(title, description, user, repo);
    }
    event.preventDefault();
}

function backtoResult(){
    showRepos();
    issueListHidden();
}

function issueView(user, repo) {
    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/' + user + '/' + repo + '/issues',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token 6505d64eff8570079661889573b737eb1bb676da");
        }
    }).done(function(data){
        loadIssues(data, repo);
    }).fail(function(){
        showError();
    });
}

function issueSubmit(title, description, user, repo) {
    $.ajax({
        type: 'POST',
        url: 'https://api.github.com/repos/' + user + '/' + repo + '/issues',
        data: JSON.stringify({ "title": title, "body": description }),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token 6505d64eff8570079661889573b737eb1bb676da");
        }
    }).done(function(data){
        showRepos();
        issueFormHidden();
    }).fail(function(){
        showError();
    });
}

function formSubmit(username) {
    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/users/' + username + '/repos'
    }).done(function(data){
        loadRepo(data, username);
            
    }).fail(function(){
        showError();
    });
}

function loadRepo(data, username) {
    var resultHtml = '<div class="details">';
            showRepos();
            $('.form-outer').addClass('hidden');
            $.each(data, function(key,val) {
               resultHtml += '<div class="repo-name"><p class="reposname">' + data[key].name + '</p><button type="button" data-name="'+ username +'" data-repo="' + data[key].name + '" class="btn btn-outline-danger btn-sm add-issue">Add Issue</button>&nbsp;<button type="button" data-name="'+ username +'" data-repo="' + data[key].name + '" class="btn btn-outline-danger btn-sm view-issue">View Issue</button></div>';
            });
            resultHtml += '</div>';

            $('.result').html(resultHtml);
            $(".add-issue").on('click', addIssue);
            $(".view-issue").on('click', viewIssue);

}

function loadIssues(data, repo) {
    issueListShow();
    var resultHtml = '<div class="details"><p class="reponame"><span>' + repo + '</span></p>';
            $.each(data, function(key,val) {
               resultHtml += '<div class="repo-name"><p><span>Issue Title:</span> ' + data[key].title + '</p><div class="issue-description"><span>Issue Description:</span> ' +  data[key].body + '</div></div>';
            });
            resultHtml += '<div class="backBtn"><button type="button" class="btn btn-primary back-result">Back</button></div></div>';

            $('.issue-list').html(resultHtml);
            $(".back-result").on('click', backtoResult);
            $('h2.title').text('List of Issues');
}

function showError() {
    $('.error-msg').removeClass('hidden');
}

function showRepos() {
    $('.result').removeClass('hidden');
    $('h2.title').text('List of Repositories');
    hideform();
    issueListHidden();
    issueFormHidden();
}

function hideRepos() {
    $('.result').addClass('hidden');
}

function issueFormHidden() {
    $('.issue-form-outer').addClass('hidden');
}

function issueFormShow() {
    $('.issue-form-outer').removeClass('hidden');
    issueListHidden();
    hideform();
    hideRepos();
}

function issueListHidden() {
    $('.issue-list').addClass('hidden');
}

function issueListShow() {
    $('.issue-list').removeClass('hidden');
    hideform();
    hideRepos();
    issueFormHidden();
}

function hideform() {
    $('.form-outer').addClass('hidden');
}