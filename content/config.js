var styles = {
    slide: {
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
    },
    fade: {
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
    },
    custom: {
    }
};
var defaultConfig = styles.slide;