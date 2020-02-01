var usJSON =[]
var postJSON=[]
var mode="";
var blog_style=$(` <div id="posts" style="background-color: aquamarine;margin-bottom : 50px;"></div> 
<div id="sendPost"></div>`)
var sendPost=`<textarea id = "postarea" style="width: 300px; height: 150px; margin-bottom : 10px;"></textarea><br>
<button type="button" id="postBtn">POST</button>`;
var postNumb=0

var postUsername ="";

$(document).ready(function(){
    $("#register").click(function(){
        if(localStorage.users == null){
            usJSON =[{"username":"aytug","password":"tombul","mode":"admin"}]; 
            localStorage.setItem('users',JSON.stringify(usJSON));
        }
        else{
            usJSON = JSON.parse(localStorage.getItem('users'))
        }
    var username = $('.username').val();
    var password = $('.password').val();
    var obj = usJSON;
    if (username == "" || password=="") {
        window.alert("Dont Blank inputs");  
    }
    else{
    for (let i = 0; i <obj.length ; i++) {
        if (username == obj[i].username) {
            return window.alert("Username Taken");
        }
        
    }
    obj.push({'username': username, "password":password,"mode":"user"});
    usJSON= JSON.stringify(obj);
    localStorage.setItem('users',JSON.stringify(obj));
    window.alert("Registered : "+username+" Your mode User!");
    usJSON= JSON.parse(usJSON);
    }    
    });
    $("#login").click(function(){
        if(localStorage.users == null){
            usJSON =[{"username":"aytug","password":"tombul","mode":"admin"}]; 
            localStorage.setItem('users',JSON.stringify(usJSON));
        }
        else{
            usJSON = JSON.parse(localStorage.getItem('users'))
        }
        var allUsers = JSON.parse(localStorage.getItem('users'));
        var username = $('.username').val();
        var password = $('.password').val();
        postUsername= username;
        for (let i = 0; i < allUsers.length; i++) {
            if (username == allUsers[i].username && password == allUsers[i].password) {
                window.alert("Welcome "+username+" You are "+allUsers[i].mode);
                $('#loginStatus').remove();
                mode = allUsers[i].mode;
                break
            }
            if (i == allUsers.length) {
                console.log("Wrong!")
            }
        }
        if (mode ==="user") {
            $("#blog").html(blog_style);
            $("#sendPost").append(sendPost);
            if (localStorage.posts == null) {
                postJSON=[]
            }else{
                postJSON=JSON.parse(localStorage.getItem('posts'));
            }
            for (let i = 0; i < postJSON.length; i++) {
                let usPost='<div id='+i+'><h4>'+
                postJSON[i].username+"</h4>"+"<br>"+'<p style="text-align: center;">'+
                postJSON[i].post+"</p><br></div>";
                $('#posts').append(usPost);
            }
        }
        else if(mode==='admin'){
            $("#blog").html(blog_style);
            $("#sendPost").append(sendPost);
            if (localStorage.posts == null) {
                postJSON=[]
            }else{
                postJSON=JSON.parse(localStorage.getItem('posts'));
            }
            for (let i = 0; i < postJSON.length; i++) {
                let usPost='<div id='+i+'><h4>'+postJSON[i].username+"</h4>"+"<br>"+'<p style="text-align: center;">'+postJSON[i].post+"</p><br>"+
                '<button type="button" id="remove">Remove</button></div>';
                $('#posts').append(usPost);
            }
            usersPanel='<div id="usersPanel" style="margin-bottom : 50px;"><h2>User Management</h2></div>'
            $("#blog").append(usersPanel)
            for (let j = 0; j < usJSON.length; j++) {
                userDiv='<div id="'+j+'"style="margin-bottom : 20px";>'+'<p><b>'+usJSON[j].username+"</b></p>"+
                '<button type="button" id="removeUser">Remove</button></div>';
                $("#usersPanel").append(userDiv);
            }
        }
    })
    
  });

$(document).on('click','#postBtn', function() {
        if (localStorage.posts == null) {
            postJSON=[]
        }else{
            postJSON=JSON.parse(localStorage.getItem('posts'));
        }
        let post=$('#postarea').val();
        postJSON.push({'username': postUsername ,'post': post});
        let usPost='';
        if (mode === "user") {
            if(localStorage.posts == null){
                postNumb=0
            }else{
                postNumb=localStorage.getItem('postNumb')
            }
            
            usPost="<div id="+postNumb +'><h4>'+postUsername+"</h4>"+"<br>"+'<p style="text-align: center;">'+post+"</p><br></div>";
            postNumb++;
            localStorage.setItem('postNumb',postNumb.toString());   
        }else if(mode === "admin"){
            if(localStorage.posts == null){
                postNumb=0
            }else{
                postNumb=localStorage.getItem('postNumb')
            }
            usPost="<div id="+postNumb +'><h4>'+postUsername+"</h4>"+"<br>"+'<p style="text-align: center;">'+post+"</p><br>"+
            '<button type="button" id="remove">Remove</button></div>';
            postNumb++;
            localStorage.setItem('postNumb',postNumb.toString())
        }
        
        localStorage.setItem('posts',JSON.stringify(postJSON));
        $('#posts').append(usPost);
        
});

$(document).on('click','#remove', function() {
    let divNumber =$(this).parent().attr('id');
    deletePost=$("#"+divNumber).children('p').text();
    for (let i = 0; i < postJSON.length; i++) {
        if(divNumber==i){
            $("#posts").children('div').remove();
            delete postJSON[i];
            postJSON=postJSON.filter(String);
            for (let j = 0; j < postJSON.length; j++) {
                let usPost='<div id='+j+'><h4>'+postJSON[j].username+"</h4>"+"<br>"+'<p style="text-align: center;">'+postJSON[j].post+"</p><br>"+
                '<button type="button" id="remove">Remove</button></div>';
                $('#posts').append(usPost);
                
            }
            localStorage.setItem('postNumb',(localStorage.getItem('postNumb')-1));
        postNumb=localStorage.getItem('postNumb');
        localStorage.setItem('posts',JSON.stringify(postJSON));
        break;
        }
        
    }
});


$(document).on('click','#removeUser', function() {
    let divNumber =$(this).parent().attr('id');
    deleteUs=$("#"+divNumber).children('p').text(); 
    for (let i = 0; i < usJSON.length; i++) {
        if (deleteUs==usJSON[i].username) {
            if (deleteUs == 'aytug') {
                window.alert('You cant delete Admin User');
            }else{
                $("#"+divNumber).remove();
                delete usJSON[i];   
                usJSON= usJSON.filter(String);
                localStorage.setItem('users',JSON.stringify(usJSON));
            }
        }
    }  

    

});
