function register() {
    var response = "";
    var jsonData = new Object();
    jsonData.Username = document.getElementById("fullname").value;
    jsonData.date_joined = new Date();
    jsonData.email = document.getElementById("email").value;
    jsonData.phone_number = document.getElementById("phone_number").value;
    jsonData.password = document.getElementById("Userpassword").value;
    if (jsonData.Username == "" || jsonData.fullname == "" || jsonData.email == "" ||
        jsonData.phone_number == "" || jsonData.password == "") {
        alert('All fields are required!');
        return;
    }
    if (jsonData.password != document.getElementById("confirm-password").value) {
        alert('Password and confirm password must be the same!'); return;
    }
    console.log(jsonData)
    var request = new XMLHttpRequest();
    request.open("POST", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/user-register", true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "user added") {
            $('#registerForm').modal('hide');
            $('#loginForm').modal('show');
            document.getElementById("loginID").value = document.getElementById("fullname").value
            alert('Success. User registered.');
        }
        else if (response.message == "Username already in use!") {
            alert('Error. Username already is use.');
        } else {
            alert('Error. Unable to register user.');
        }
    };
    request.send(JSON.stringify(jsonData));
}

function user_login() {
    var response = "";
    var jsonData = new Object();
    jsonData.Username = document.getElementById("loginUser").value;
    jsonData.password = document.getElementById("loginPassword").value;
    if (jsonData.Username == "" || jsonData.password == "") {
        alert('All fields are required!'); return;
    }
    console.log(jsonData);
    var request = new XMLHttpRequest();
    request.open("POST", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/user-login", true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(JSON.parse(request.responseText));
        if (response.Count == 1 || response.length == 1) {
            if (response.Count == 1) {
                sessionStorage.setItem("Username", jsonData.Username);
                sessionStorage.setItem("user", JSON.stringify(response.Items[0]));
            }
            $('#loginForm').modal('hide');
            setNavBar();
        }
        else {
            alert('Error. Unable to login.');
        }
    };
    request.send(JSON.stringify(jsonData));
}
function fillProfile() {
    if (sessionStorage.getItem("Username") != null) {
        var jsonData = JSON.parse(sessionStorage.getItem("user"));
        document.getElementById("profileName").value = jsonData.Username;
        document.getElementById("profileEmail").value = jsonData.password;
        document.getElementById("profilePassword").value = jsonData.email;
        document.getElementById("profileNumber").value = jsonData.phone_number;
        document.getElementById("profileDate").value = jsonData.date_joined;
    }
}
function updateProfile() {
    var response = "";
    var jsonData = new Object();
    jsonData.Username = document.getElementById("profileName").value;
    jsonData.email = document.getElementById("profileEmail").value;
    jsonData.phone_number = document.getElementById("profileNumber").value;
    jsonData.date_joined = document.getElementById("profileDate").value;
    jsonData.password = document.getElementById("profilePassword").value;
    if (jsonData.email == "" || jsonData.phone_number == "" || jsonData.password == "") {
        alert('All fields are required!'); return;
    }
    var request = new XMLHttpRequest();
    request.open("PUT", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/user-profile", true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "user edited") {
            alert('Profile updated successfully. Please sign in again.');
            sessionStorage.removeItem("Username");
            sessionStorage.removeItem("user");
            window.location = "index.html"
        }
        else {
            alert('Error. Unable to update profile.');
        }
    };
    request.send(JSON.stringify(jsonData));
}
function deleteUser() {
    var response = "";
    var User = sessionStorage.getItem("Username");
    var jsonData = new Object();
    console.log(User);
    var request = new XMLHttpRequest();
    request.open("DELETE", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/user-delete/"+ User, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "user deleted") {
            alert('Profile deleted successfully.');
            sessionStorage.removeItem("Username");
            sessionStorage.removeItem("user");
            window.location = "index.html"
        }
        else {
            alert('Error. Unable to delete profile.');
        }
    };
    request.send();
}