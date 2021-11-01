    reRenderUI ()
function reRenderUI () {
    if (window.localStorage.getItem('loggedin') == 'false' || 'null') {
                console.log('boo')
        document.getElementById('todocontent').setAttribute('hidden', 'hidden')
        document.getElementById('catcontent').setAttribute('hidden', 'hidden')
        document.getElementById('anoncontent').removeAttribute('hidden')
    } else {
                console.log('hoo')        
        document.getElementById('anoncontent').setAttribute('hidden', 'hidden')
        document.getElementById('todocontent').removeAttribute('hidden')
        document.getElementById('catcontent').removeAttribute('hidden')
    }
}

function login (evt) {
    evt.preventDefault ();
    var theFromData = {};
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
    url = '/api/doesuserexist' + '?username=' + 
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