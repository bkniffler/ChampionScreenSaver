ChampionScreenSaver
===================

A champion screensaver for League of Legends fans.

Preview
===================
https://rawgit.com/bkniffler/ChampionScreenSaver/master/index.html?style=fade
https://rawgit.com/bkniffler/ChampionScreenSaver/master/index.html?style=slide
(slide might suffer from performance issues due to heavy .css animations)

Installation
===================
Mac:
- Download WebXSaverII http://www.ncsu.edu/mac/downloads/webXsaverII.zip
- Download https://github.com/bkniffler/ChampionScreenSaver/blob/master/bin/ChampionScreenSaver.zip
- Put its content wherever you like
- Point WebXSaverII to index.html

Win:
- Download https://github.com/bkniffler/ChampionScreenSaver/blob/master/bin/ChampionScreenSaverWin.zip
- Put its content wherever you like
- Right click ChampionScreenSaverWin.scr and install

Linux:
- I have no idea, but if it's possible to use html as a screensaver, the Mac procedure should apply

Styles
===================
There are different styles you can set. Currently "fade" and "slide" are possible.

Win
- Use the config.json file in the executable directory to set the parameters in json format, e.g.
```
{
    "style": "fade",
}
```

Mac
- Use URL parameters while pointing WebXSaverII to index.html
```
/Users/xxx/ChampionScreenSaver/index.html?style=fade
```

Parameters
===================
You can create your own styles by setting the parameters yourself.

Win
- Use the config.json file in the executable directory to set the parameters in json format, e.g.
```
{
    "cycle": "5",
    "interval": "0.2"
}
```

Mac
- Use URL parameters while pointing WebXSaverII to index.html
```
/Users/xxx/ChampionScreenSaver/index.html?cycle=0.5&interval=0.2
```

Example configrations:
===================
- Slide
```
// Cycle speed in seconds (time to restart cycle after all champions have changed)
cycle: 5,
// Interval of champion change in seconds within a cycle
interval: 0.2,
// Speed of animation transitions in seconds
speed: 0.6,
// Animation style (default or animate.css transition name)
animation: "default",
// Visible slots (max. 10)
slots: 7,
// Cycle mode (all = change all champions, single = change only one champion)
mode: "all",
// Direction of champion change (random, leftToRight, rightToLeft)
direction: "random",
// Image style
imageStyle: "splash",
// Size of champion images in percentage
size: 95,
// Color name or hex
color: "black"
```
- Fade
```
// Cycle speed in seconds (time to restart cycle after all champions have changed)
cycle: 5,
// Interval of champion change in seconds within a cycle
interval: 0.2,
// Speed of animation transitions in seconds
speed: 2,
// Animation style (default or animate.css transition name)
animation: "fadeIn",
// Visible slots (max. 10)
slots: 7,
// Cycle mode (all = change all champions, single = change only one champion)
mode: "all",
// Direction of champion change (random, leftToRight, rightToLeft)
direction: "leftToRight",
// Image style
imageStyle: "splash",
// Size of champion images in percentage
size: 95,
// Color name or hex
color: "black"
```

Contribution:
===================
The current version does only have very few images. You're very welcome to contribute. Just fork the project and give me a pull request or send me the pictures as a zipped file via message.

Add champions and skins as
```
- Splash ("content/splash", pictures with solid border), size: 378x1080
- Classic ("content/classic", pictures with gradient border), size 308x560
```
Name these images "[name of champion]_[skin number].jpg", e.g. Aatrox_0.jpg, Aatrox_1.jpg, Lux_0.jpg, ...
The images can be found under
```
League of Legends\RADS\projects\lol_air_client\releases\0.0.1.88\deploy\assets\images\champions
```


Now edit the "content/champions.js" file and add them images
```
var champions = [{
    name: "Aatrox",
    skins: [0, 1]
}, {
    name: "Ahri",
    skins: [0, 1]
}, {
    name: "Akali",
    skins: [0, 1]
}, {
    name: "Alistar",
    skins: [0, 1]
}, {
    name: "Amumu",
    skins: [0, 1]
}, {
    name: "Anivia",
    skins: [0, 1]
},{
    name: "Annie",
    skins: [0, 1]
}, {
    name: "Ashe",
    skins: [0, 1]
}, {
    name: "Brand",
    skins: [0, 1]
}, {
    name: "Caitlyn",
    skins: [0, 1]
}]
```

Libraries used:
===================
- AngularJS (as a framework)
- Underscore.js (as a helper)
- Animate.css (for groovy animations)
- Node-Webkit (for Windows distribution)

Legal:
===================
League of Legends - ChampionScreenSaver isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games
or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks
or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.

License:
===================
GNU 2