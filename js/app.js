// This stuff is for node-webkit
var browser = true;
var nwConfig = {};
try {
    var gui = require('nw.gui');
    gui.Window.get().show();
    browser = false;
    var fs =  require('fs');
    var path = require('path');
    var cwd = path.dirname( process.execPath );
    // Try get config.json from application directory
    var cfg = path.resolve(cwd, 'config.json');
    if(fs.existsSync(cfg)){
        var content = fs.readFileSync(cfg);
        nwConfig = JSON.parse(content);
    }
}
catch(e){ }

// Module
angular.module('championScreenSaver', ['ngAnimate'], function ($compileProvider) {
    $compileProvider.directive('slot', function($compile) {
        return {
            replace: false,
            restrict: 'A',
            scope: true,
            link: function (scope, element) {
                // draw champion element
                function championElement(scope, champion, zindex){
                    if(zindex == undefined) zindex = 0;
                    return "<div class='champion animated {{item.animation}}'"
                        + "style='background-image:url("+scope.getImage(champion)+");-webkit-animation-duration:{{options.speed}}s;"
                        + "animation-duration:{{options.speed}}s;z-index:"+zindex+";background-size: "+scope.options.size+"% auto;'></div>";
                }
                // slot id
                var slot = _.indexOf(scope.slots, scope.item);
                // initial draw element
                element.append($compile(championElement(scope, scope.slots[slot].champion))(scope));
                scope.slots[slot].switch = function(champion){
                    scope.slots[slot].champion = champion;
                    // draw champion element
                    element.append($compile(championElement(scope, champion, scope.slotIterations))(scope));
                    // remove first child if more than 2 layers overlap
                    if(element[0].childNodes.length > 1){
                        element[0].removeChild(element[0].firstChild);
                    }
                }
            }
        };
        // Directive for color changing and application exit if on node-webkit
    }).directive('body', function($timeout) {
            return {
                restrict: 'E',
                link : function (scope, element, attrs) {
                    element.css("background-color",
                        /^#[0-9A-F]{6}$/i.test('#' + scope.options.color)
                        ? ("#" + scope.options.color)
                        : scope.options.color)
                    if(browser) return;
                    element.addClass("nocursor");
                    $timeout(function(){
                        /*var count = 0;
                         element.bind("mousemove", function(event){
                         count++;
                         if(count > 5)
                         gui.App.quit();
                         });*/
                        element.bind("keyup", function(event){
                            gui.App.quit();
                        });
                    }, 1000);
                }
            };
        });
});

// Main Controller
function mainController($scope, $timeout, $window, $http){
    $scope.browser = browser;
    $scope.slots = [];
    $scope.champions = [];
    $scope.iterations = 0;
    $scope.slotIterations = 0;

    // Merge options from config file and URL
    $scope.options = angular.extend({}, defaultConfig, queryString($window.location.search), nwConfig);
    if($scope.options.style){
        $scope.options = angular.extend({}, $scope.options, styles[$scope.options.style]);
    }

    // View methods
    $scope.getImage = function(champion){
        if(champion == undefined) return;
        return "content/" + $scope.options.imageStyle + "/" + champion.name + ".jpg";
    };

    // Get champions from /content/champions.js
    $scope.champions = champions;
    // Champions controller
    var championsCtrl = {
        // Champions
        queue: [],
        // Rebuild the queue
        build: function(){
            if(championsCtrl.queue.length == 0){
                championsCtrl.queue = shuffle($scope.champions.map(function(item){return _.indexOf($scope.champions, item);}));
                if($scope.slots.length > 0)
                    championsCtrl.queue = _.difference(championsCtrl.queue, $scope.slots.map(function(item){return _.indexOf($scope.champions, item.champion);}));
            }
        },
        // Get next queue element
        next: function(){
            if(championsCtrl.queue.length == 0) championsCtrl.build();
            var item = championsCtrl.queue[0];
            championsCtrl.queue.splice(0, 1);
            return item;
        }
    };

    // Slots controller
    var slotsCtrl = {
        // Champions
        queue: [],
        // Init slots
        init: function(){
            for(var i = 0;i<$scope.options.slots;i++){
                var animation = $scope.options.animation;
                if($scope.options.animation == "default")
                    animation = ((i+1) % 4 ) === 0 ? "bounceInRight" : ((i+1) % 3 ) === 0 ? "bounceInDown" : ((i+1) % 2 ) === 0 ? "bounceInLeft" : "bounceInUp";
                $scope.slots.push({
                    animation: animation,
                    champion: $scope.champions[championsCtrl.next()]
                });
            }
        },
        // Rebuild the queue
        build: function(){
            if(this.queue.length == 0){
                if($scope.options.direction == "random")
                    slotsCtrl.queue = shuffle($scope.slots.map(function(item){return _.indexOf($scope.slots, item);}));
                else if($scope.options.direction == "leftToRight")
                    slotsCtrl.queue = $scope.slots.map(function(item){return _.indexOf($scope.slots, item)});
                else if($scope.options.direction == "rightToLeft")
                    slotsCtrl.queue = $scope.slots.map(function(item){return _.indexOf($scope.slots, item)}).reverse();
            }
        },
        // Get next queue element
        next: function(){
            if(slotsCtrl.queue.length == 0) slotsCtrl.build();
            var item = slotsCtrl.queue[0];
            slotsCtrl.queue.splice(0, 1);
            return item;
        },
        // Get next queue element
        champion: function(slot){
            $scope.slots[slot].switch($scope.champions[championsCtrl.next()]);
        }
    };

    // Initialize
    slotsCtrl.init();

    // Start routine
    (function start() {
        $timeout(function(){
            if($scope.iterations == 2147483647) $scope.iterations = 0;
            $scope.iterations = $scope.iterations + 1;
            var next = function(func){
                if($scope.slotIterations == 2147483647) $scope.slotIterations = 0;
                $scope.slotIterations = $scope.slotIterations + 1;
                slotsCtrl.champion(slotsCtrl.next());
                if(slotsCtrl.queue.length == 0 || $scope.options.mode == "single")
                    start();
                else{
                    $timeout(function(){
                        func(next);
                    }, $scope.options.interval * 1000);
                }
            }
            next(next);
        }, $scope.options.cycle * 1000);
    })();
}

// Shuffle an array
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// Get a json object from query string
function queryString(s){
    var p = s.slice(1).split('&'), r = {};
    p.forEach(function(x) {
        x = x.split('=');
        r[x[0]] = decodeURIComponent(x[1] || '');
    });
    return JSON.parse(JSON.stringify(r));
};