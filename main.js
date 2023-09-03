// Home Page
document.addEventListener("DOMContentLoaded", function() {
    function setupToggle(sectionId, toggleId, toggleHiddenId, listId) {
        const toggle = document.getElementById(toggleId);
        const toggleHidden = document.getElementById(toggleHiddenId);
        const list = document.getElementById(listId);

        toggle.addEventListener("click", function() {
            list.classList.toggle("hidden");
            toggle.classList.toggle("hidden");
            toggleHidden.classList.toggle("hidden");
        });

        toggleHidden.addEventListener("click", function() {
            list.classList.toggle("hidden");
            toggleHidden.classList.toggle("hidden");
            toggle.classList.toggle("hidden");
        });
    }

    setupToggle("teamsList", "teamsToggle", "teamsToggleHidden", "teamsList");
    setupToggle("playersList", "playersToggle", "playersToggleHidden", "playersList");
    setupToggle("recordsList", "recordsToggle", "recordsToggleHidden", "recordsList");
});

// End Home Page

//Start login page
function logIn(){
    let user = document.forms["loginFormf"]["usr"].value
    let cipher = document.forms["loginFormf"]["pssd"].value
    if(user == ""){
        alert("username can't be empty!")
        return false
    }
    if(cipher == ""){
        alert("Password can't be empty!")
        return false
    }
    if(user == "admin" && cipher == "admin"){
        localStorage.setItem("currentUser",user)
            alert("Welcome admin!")
            localStorage.setItem("currentSession","open")
            return true
        }
    let retUsr = localStorage.getItem(user)
    if(retUsr !=null){
        if(retUsr == cipher){
            localStorage.setItem("currentUser",user)
            alert("Welcome!")
            localStorage.setItem("currentSession","open")
            return true
        }
        else{
            alert("Wrong password!")
            return false
        }
    }
    else{
        alert("User not registered!")
        return false
    }
    }

    //End login page

    //Start Register page
    function Reg(){
        let user = document.forms["regForm"]["usr"].value
        let email = document.forms["regForm"]["mail"].value
        let cipher = document.forms["regForm"]["pssd"].value
        let retUsr = localStorage.getItem(user)
        if(retUsr !=null){
           alert("Username already exists, try another one or reset password")
           return false
        }
        else{
            if(!email.match(/([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9_.+-]+)\.([a-zA-Z0-9_.+-]+)/)){
                alert("wrong email format!")
                return false
            }
            localStorage.setItem(user,cipher)
            localStorage.setItem(user+"Email",email)
            alert("Registered Successfully! Please login")
            return true
            }
    }
    //End Register page

    //Global
    function checkSession(){
        var session = localStorage.getItem("currentSession")
        if(session == "open"){
            const btn = document.getElementById("listLogin")
             btn.style.display = "none"
            const loBtn = document.getElementById("lout")
            loBtn.style.display = "block"
        }
    }
    function logOut(){
        if(localStorage.getItem("currentSession")=="open"){
            localStorage.setItem("currentUser","none")
            localStorage.setItem("currentSession","closed")
            location.reload()
        }
    }
    function redirect(){
        if(localStorage.getItem("currentSession")=="open"){
            location.replace("index.html")
        }
    }
    function checkIndexSession(){
        var session = localStorage.getItem("currentSession")
        if(session == "open"){
            if(localStorage.getItem("currentUser")=="admin"){
                location.replace("adminIndex.html")
            }
            const btn = document.getElementById("listLogin")
             btn.style.display = "none"
            const loBtn = document.getElementById("lout")
            loBtn.style.display = "block"
        }
    }
    function checkAdmin(){
        if(localStorage.getItem("currentUser")!="admin"){
            location.replace("index.html")
        }
        checkSession()
    }
    function toggleAddUsr(){
        location.replace("adminAddUser.html")
    }
    function toggleDelUsr(){
        location.replace("adminDelUser.html")

    }
    function toggleEditUsr(){
        location.replace("adminEditUser.html")
    }
    function AddUsr(){
       var user = document.forms["addUsrForm"]["usr"].value
       var email = document.forms["addUsrForm"]["mail"].value
       var cipher = document.forms["addUsrForm"]["pssd"].value
       if(localStorage.getItem(user)!=null){
        alert("User already registered")
        return false
       }
       else{
        if(!email.match(/([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9_.+-]+)\.([a-zA-Z0-9_.+-]+)/)){
            alert("wrong email format!")
            return false
        }
        localStorage.setItem(user,cipher)
        localStorage.setItem(user+"Email",email)
        alert("User Added Successfully!")
        return true
        }

    }
    function DelUsr(){
        if(checkUsr()==false){
            alert("User Not Found!")
            return false
        }
        var usr = document.forms["delUsrForm"]["usr"].value
        var email = document.forms["delUsrForm"]["usr"].value+"Email"
        localStorage.removeItem(email)
        localStorage.removeItem(usr)
        alert("User Deleted Successfully!")
        return true       

    }
    function checkUsr(){
        var usr = localStorage.getItem(document.forms["delUsrForm"]["usr"].value)
        if(usr==null){
            return false
        }
        alert("User Found!")
        return true
    }
    function editUser(){
        user = document.forms["editUsrForm"]["usr"].value
        pssd = document.forms["editUsrForm"]["editUsrPssd"].value
        email = document.forms["editUsrForm"]["editUsrMail"].value
        if(user!="" && email == "" && pssd!=""){
            localStorage.setItem(user,pssd)
            alert("User Saved Successfully!,Only Password altered!")
            return true
        }
        else if (user!="" && email != "" && pssd =="" && email.match(/([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9_.+-]+)\.([a-zA-Z0-9_.+-]+)/)){
            localStorage.setItem(user+"Email",email)
            alert("User Saved Successfully!,Only Email altered!")
            return true
        }
        else if(user!="" && email != "" && pssd !="" && email.match(/([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9_.+-]+)\.([a-zA-Z0-9_.+-]+)/)){
            localStorage.setItem(user,pssd)
            localStorage.setItem(user+"Email",email)
            alert("User Saved Successfully!")
            return true
        }
        else{
            alert("Check username or Email and try again!")
            return false
        }

        
        
        return true
    }
    function searchUser(){
        var user = document.forms["editUsrForm"]["usr"].value
        var pssd = localStorage.getItem(user)
        if(pssd == null){
            alert("User Not Found")
        }
        else{
            alert("User Found!")
            const field1 = document.getElementById("editUsrMail")
            field1.style.display = "block"
            const field2 = document.getElementById("editUsrPssd")
            field2.style.display = "block"
            const btn = document.getElementById("editUsrSubmit")
            btn.style.display = "block"
            field1.innerHTML = localStorage.getItem(user+"Email")
            field2.innerHTML = localStorage.getItem(user)
        }
    }
