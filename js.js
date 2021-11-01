reRenderUI ()
function reRenderUI () {
    if (window.localStorage.getItem('loggedin') == 'false' || 'null') {
            console.log('boo')
        document.getElementById('L').removeAttribute('hidden')
        document.getElementById('G').setAttribute('hidden', 'hidden')
        document.getElementById('MS').setAttribute('hidden', 'hidden')
    } else {
            console.log('hoo')        
        document.getElementById('L').setAttribute('hidden', 'hidden')
        document.getElementById('G').removeAttribute('hidden')
        document.getElementById('MS').removeAttribute('hidden')
    }
}

function login (evt) {
    evt.preventDefault ();
    console.log(evt);
    /*var theFromData = {};
    for (i=0;i<evt.target.length;i++) {
        theFromData[evt.target[i].name] = 
            evt.target[i].value;
    }
    fetch('login.php', 
        {
            method: 'POST', 
            body: JSON.stringify(theFromData),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then (
        function (headers) {
            if (headers.status === 401) {
                console.log('login failed')
                window.localStorage.setItem('loggedin', 'false')
                reRenderUI ()
                return
            }
            if (headers.status === 200) {
                window.localStorage.setItem('loggedin', 'true')
                reRenderUI ()
                console.log('login success')
                return
            }
        }
    );*/
}

function register (evt) {
    evt.preventDefault ();
    var theFromData = {};
    for (i=0;i<evt.target.length;i++) {
        theFromData[evt.target[i].name] = 
            evt.target[i].value;
    }
    fetch(evt.target.action, 
        {
            method: 'PUT', 
            body: JSON.stringify(theFromData),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then (
        function (headers) {
            if (headers.status === 201) {
                console.log('account created successfully')
                return
            }
        }
    );
}

function userExists (evt) {
    evt.preventDefault ();
    console.log(evt);
    url = '../api/doesuserexist' + '?username=' + 
        evt.target.value;
    console.log(url);
    fetch(url, 
        {
            method: 'GET', 
            credentials: 'include'
        }
    )
    .then (
        function (headers) {
            if (headers.status === 200) {
                console.log('user exists')
                return
            }
            if (headers.status === 204) {
                console.log('user does not exist')
                return
            }
        }
    );
}

function emailExists (evt) {
    evt.preventDefault ();
    url = '/api/doesemailexist' + '?email=' + 
        evt.target.value;
    fetch(url, 
        {
            method: 'GET', 
            credentials: 'include'
        }
    )
    .then (
        function (headers) {
            if (headers.status === 200) {
                console.log('email exists')
                return
            }
            if (headers.status === 204) {
                console.log('email does not exist')
                return
            }
        }
    );
}

function userloggedin (evt) {
    evt.preventDefault ();
    fetch(evt.target.action, 
        {
            method: 'GET', 
            credentials: 'include'
        }
    )
    .then (
        function (headers) {
            if (headers.status === 401) {
                console.log('not loggedin')
                window.localStorage.setItem('loggedn', 'true')
                return
            }
            if (headers.status === 200) {
                console.log('logged in')
                window.localStorage.setItem('loggedin', 'false')
                return
            }
        }
    );
}

function userlogout (evt) {
    evt.preventDefault ();
    fetch(evt.target.action, 
        {
            method: 'GET', 
            credentials: 'include'
        }
    )    
    .then (
        function (headers) {
            if (headers.status === 200) {
                console.log('logged out successfully')
                window.localStorage.setItem('loggedin', 'false')
                reRenderUI ()
                return
            }
        }
    );

}

function change_Page(x){
    console.log("bark");

    var G = document.getElementById("G");
    var MS = document.getElementById("MS");
    var y = document.getElementById(x);

    G.style.display="none";
    MS.style.display="none";

    y.style.display="block";
}

/*function Search(){
    var search = document.getElementById("search");

    search.style.display="none";
}*/