console.log(window.localStorage.getItem('loggedin'))
reRenderUI ()
function reRenderUI () {
    console.log('run')
    if (window.localStorage.getItem('loggedin') == ('false' || 'null')) {
            console.log(window.localStorage.getItem('loggedin'))
        document.getElementById('L').removeAttribute('hidden')
        document.getElementById('G').setAttribute('hidden', 'hidden')
        document.getElementById('MS').setAttribute('hidden', 'hidden')
    } else {
            console.log(window.localStorage.getItem('loggedin'))
        document.getElementById('L').setAttribute('hidden', 'hidden')
        document.getElementById('G').removeAttribute('hidden')
        document.getElementById('MS').removeAttribute('hidden')
        var G = document.getElementById("G");
        var MS = document.getElementById("MS");
    
        G.style.display="none";
        MS.style.display="block"; 
    }
}

function login (evt) {
    evt.preventDefault ();
    console.log(evt);
    var theFromData = {};
    for (i=0;i<evt.target.length;i++) {
        theFromData[evt.target[i].name] = 
            evt.target[i].value;
    }
    fetch(evt.target.action, 
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
                console.log('login success')
                console.log(window.localStorage.getItem('loggedin'))
                reRenderUI ()
                return
            }
        }
    );
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
    url = '/api/doesuserexist' + '?username=' + 
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
    url = 'api/doesemailexist' + '?email=' + 
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

function logout (evt) {
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

function getcategories (evt) {
    evt.preventDefault ();
    fetch(evt.target.action, 
        {
            method: 'GET', 
            credentials: 'include'
        }
    )
    .then (
        function (headers) {
            if (headers.status === 403) {
                console.log('not authorised')
                return
            }
        }
    );
}

function addcategory (evt) {
    evt.preventDefault ();
    var theFromData = {};
    theFromData[evt.target[0].name] = 
        evt.target[0].value;
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
            if (headers.status === 403) {
                console.log('not authorised')
                return
            }
        }
    );
}

function delcategory (evt) {
    evt.preventDefault ();
    var url = evt.target.action + '/' + evt.target[0].value;
    fetch(url, 
        {
            method: 'DELETE', 
            credentials: 'include'
        }   
    )
    .then (
        function (headers) {
            if (headers.status === 403) {
                console.log('not authorised')
                return
            }
        }
    );
}

function updatecategory (evt) {
    evt.preventDefault ();
    var url = evt.target.action + '/' + evt.target[0].value;
    var theFromData = {};
    theFromData[evt.target[1].name] = 
        evt.target[1].value;
    fetch(url, 
        {
            method: 'PATCH', 
            body: JSON.stringify(theFromData),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then (
        function (headers) {
            if (headers.status === 403) {
                console.log('not authorised')
                return
            }
        }
    );
}

function gettodos (evt) {
    evt.preventDefault ();
    var url = evt.target.action + '/' + evt.target[0].value;
    fetch(url, 
        {
            method: 'GET', 
            credentials: 'include'
        }   
    )
    .then (
        function (headers) {
            if (headers.status === 403) {
                console.log('not authorised')
                return
            }
        }
    );
}

function addtodo (evt) {
    evt.preventDefault ();
    var theFromData = {};
    theFromData[evt.target[0].name] = 
        evt.target[0].value;
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
            if (headers.status === 403) {
                console.log('not authorised')
                return
            }
        }
    );
}

function deltodo (evt) {
    evt.preventDefault ();
    var url = evt.target.action + '/' + evt.target[0].value;
    fetch(url, 
        {
            method: 'DELETE', 
            credentials: 'include'
        }   
    )
    .then (
        function (headers) {
            if (headers.status === 403) {
                console.log('not authorised')
                return
            }
        }
    );
}

function updatetodo (evt) {
    evt.preventDefault ();
    var url = evt.target.action + '/' + evt.target[0].value;
    var theFromData = {};
    theFromData[evt.target[1].name] = 
        evt.target[1].value;
    fetch(url, 
        {
            method: 'PATCH', 
            body: JSON.stringify(theFromData),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then (
        function (headers) {
            if (headers.status === 403) {
                console.log('not authorised')
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

function change_Style(){
    var Page = document.getElementById("page");
    console.log(Page.className);
    if (Page.className == "uk-dark"){
        document.getElementById("page").classList.remove('uk-dark');
        document.getElementById("page").classList.add('uk-light');
    } else {
        document.getElementById("page").classList.remove('uk-light');
        document.getElementById("page").classList.add('uk-dark');
    }
}

/*function Search(){
    var search = document.getElementById("search");

    search.style.display="none";
}*/