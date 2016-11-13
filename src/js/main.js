var MarketingMap = (function() {

    function init(opts) {

    }

    var
        publicAPI = {
            init:init
        }
        ;

    return publicAPI;
})();

d3.json("js/state.shapes.json", function(error, counties) {
    if (error) return console.error(error);

    d3.json("js/indie.min.json", function(error, plans) {
        plans.forEach(function(plan) {
            counties.features.some(function(county) {
                if (plan.state === county.properties.STATEFP && plan.county === county.properties.COUNTYFP) {
                    county.properties.plans = plan.plans;
                    return true;
                }
            });
        });
    });
3
    var stateArray = counties.features.filter(function(st) {
        return st.properties.STATEFP === "17";
    });

    var width = 1160,
        height = 960;

    var state = {
        type: "FeatureCollection",
        features: stateArray
    }

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    console.log(state);

    svg.append('g')
        .attr('class', 'counties')
        .selectAll('path')
        .data(state.features)
        .enter().append('path')
        .attr('d', d3.geo.path());


    //MarketingMap.init({map: counties});
});
