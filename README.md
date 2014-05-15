ChampionScreenSaver
===================

A champion screensaver for League of Legends fans.

Preview
===================
https://rawgit.com/bkniffler/ChampionScreenSaver/master/index.html?style=fade

Installation
===================
Mac:
- Download WebXSaverII
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
imageStyle: "tile",
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
imageStyle: "tile",
// Size of champion images in percentage
size: 95,
// Color name or hex
color: "black"
```
