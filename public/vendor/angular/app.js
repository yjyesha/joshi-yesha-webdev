/**
 * Created by yeshajoshi on 7/17/2017.
 */

var app = angular.module("WamApp",[ngRoute]);

app.controller("loginController",loginController);

app.config(configuration);

function configuration($routeProvider)
{
    $routeProvider
        .when("/login")
}

function loginController($scope)
{
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ]
    $scope.hello ="Hello from the loginController";
    $scope.login =  function(user)
    {
        alert("logged in :"+user.username);
        for(var u in users)
        {
            var _user = users[u];
            if(_user.username==user.username && _user.password==user.password)
            {
                $scope.welcomeUser = _user;
            }
        }
    }
}