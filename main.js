
$(document).ready(function(){
    $(".add-issue-section").hide();
    $("#add-issue-btn").click(function(){
        $(".add-issue-section").toggle();

    });
});


document.getElementById('add-issue-form').addEventListener('submit', saveIssue);

function saveIssue(z) {
    var issuer = document.getElementById('fullName').value;
    var issueSeverity = document.getElementById('severity').value;
    var issueDescription = document.getElementById('description').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';


    var issue = {
        fullName: issuer,
        severity: issueSeverity,
        description: issueDescription,
        id: issueId,
        status: issueStatus
    }

    if (localStorage.getItem('issuesItems') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issuesItems', JSON.stringify(issues));
      } else {
        var issues = JSON.parse(localStorage.getItem('issuesItems'));
        issues.push(issue);
        localStorage.setItem('issuesItems', JSON.stringify(issues));
      }
    
      document.getElementById('add-issue-form').reset();
    
      getIssues();
    
      z.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issuesItems'));
    for (var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = 'Closed';
      }
    }
  
    localStorage.setItem('issuesItems', JSON.stringify(issues));
  
    getIssues();
  
  }


function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issuesItems'));
  
    for (var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
  
    localStorage.setItem('issuesItems', JSON.stringify(issues));
  
    getIssues();
}
  

function getIssues() {
    var issues = JSON.parse(localStorage.getItem('issuesItems'));
    var issuesList = document.getElementById('issues-list');
    issuesList.innerHTML = '';
    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var name = issues[i].fullName;
        var status = issues[i].status;
        issuesList.innerHTML +=   '<div class="row p-3 m-3 issues">'+
                                        '<div class="col-md-3 user text-center mb-4">'+
                                            '<img id="avatar" src="assets/placeholder.png">'+
                                            '<p>' + name + '</p>'+
                                            '<a href="#" id="close" onclick="setStatusClosed(\''+id+'\');" class="close-btn btn btn-warning">Close</a> '+
                                            '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                        '</div>'+
                                        '<div class="col-md-9 issue-content">'+
                                            '<h6>Issue ID: ' + id + '</h6>'+
                                            '<h4 class="mb-3">Status: <span class="status badge badge-success">' + status + '</span></h4>'+
                                            '<h4 class="mb-3">Severity: <span class="severity badge">' + severity + '</span></h4>'+
                                            '<h4>Description: </h4>'+
                                            '<p class="p-2">' + desc + '</p>'+
                                            
                                            
                                            
                                        '</div>'+
                                    '</div>';
        if (status == 'Closed') {
            document.getElementsByClassName("close-btn")[i].style.display = "none";
            document.getElementsByClassName("status")[i].classList.remove('badge-success');
            document.getElementsByClassName("status")[i].classList.add('badge-secondary');
        }
        if (severity == 'High') {
            document.getElementsByClassName("severity")[i].classList.add('badge-danger');
        } else if (severity == 'Medium') {
            document.getElementsByClassName("severity")[i].classList.add('badge-warning');
        } else {
            document.getElementsByClassName("severity")[i].classList.add('badge-primary');
        }
        if (issues.length > 0) {
            document.getElementById("hide").style.display = "none";
        }

    }
}
