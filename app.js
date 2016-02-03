'use strict';

var app = angular.module('app',['config']);

app.controller('Controller', function (
    VisualizationService,
    CONTEXT_TYPES,
    VIS_DATA_TYPES,
    VIS_NAMES
) {
    var convert = function(data) {
        console.log("in convert");

        //simulating results from db
        data = [data];

        //fetch maximum value
        var max = Math.max.apply(Math, Object.keys(data[0]).map(function(k) {return data[0][k]}));

        var maxFontsize = 50;
        var ratio = maxFontsize / max;

        //start filtering out objects, if threshold is surpassed; done to keep wordcloud somewhat lucid and
        //to speeding up rendering
        var thresholdKeys = 100;
        var filter = Object.keys(data[0]).length > thresholdKeys;

        var array = Object.keys(data[0]).map(function(k) {
            var bigEnough = true;

            if(filter) {bigEnough = data[0][k] * ratio > 1;}

            if(bigEnough) {
                return {
                    text : k,
                    size : data[0][k]
                };
            }
        });

        return array.filter(function(value) {return typeof value !== "undefined"});
    };

    d3.json("visualization/prototype/word-cloud.json", function(error, data) {
        //console.log(data);

        var vis = VisualizationService.getVisualization(VIS_NAMES.WORD_CLOUD);
        console.log(VisualizationService.getDataTypes(VIS_NAMES.WORD_CLOUD));
        console.log(VisualizationService.getVisualizationContexts(VIS_NAMES.WORD_CLOUD));
        console.log(VisualizationService.getNamesByContextAndType(CONTEXT_TYPES.EDGE, VIS_DATA_TYPES.TEXT));
        console.log(VisualizationService.getByContextAndType(CONTEXT_TYPES.NODE, VIS_DATA_TYPES.TEXT));
        console.log(VisualizationService.getNamesByContextAndType(null, VIS_DATA_TYPES.TEXT));
        console.log(VisualizationService.getNamesByContextAndType(CONTEXT_TYPES.EDGE, null));

        console.log(vis);
        var V = Object.create( vis.prototype );
        //var V = new vis();
            V.render(data, convert, "#svgContainer");
    });
});