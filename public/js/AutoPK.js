const log = console.log;

function openPage(pageName) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    // tablinks = document.getElementsByClassName("tablink");
    // for (i = 0; i < tablinks.length; i++) {
    //     tablinks[i].style.backgroundColor = "";
    // }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultTab").click();
document.getElementById('calculateCombat').addEventListener("click", () => {
    fetchRequest("GET", '/helloworld!', {}, (data) => {
        log(data.message);
    });
})


// Helper function to send a request to the server using the fetch() api
function fetchRequest(requestType, URL, data, callback) {
    if (requestType == "GET") {
        fetch(URL, {
                method: requestType,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) { // server sending non-200 codes
                    log("Error status:", response.status);
                    return;
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    log("Request Successful");
                    callback(data);
                } else {
                    log("Request Failed");
                }
            })
            .catch((error) => {
                console.error('Encountered error:', error);
            });

    } else {
        fetch(URL, {
                method: requestType,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) { // server sending non-200 codes
                    log("Error status:", response.status);
                    return;
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    log("Request Successful");
                    callback(data);
                } else {
                    log("Request Failed");
                }
            })
            .catch((error) => {
                console.error('Encountered error:', error);
            });
    }
}