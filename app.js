'use strict';

var app = angular.module('app',['config']);

app.controller('Controller', function (
    VisualizationService,
    DataConverter,
    CONTEXT_TYPES,
    VIS_DATA_TYPES,
    VIS_NAMES
) {

    d3.json("visualization/prototype/word-cloud.json", function(error, data) {
        //console.log(data);

        var vis = VisualizationService.getVisualization(VIS_NAMES.WORD_CLOUD);
        //console.log(VisualizationService.getDataTypes(VIS_NAMES.WORD_CLOUD));
        //console.log(VisualizationService.getVisualizationContexts(VIS_NAMES.WORD_CLOUD));
        //console.log(VisualizationService.getNamesByContextAndType(CONTEXT_TYPES.EDGE, VIS_DATA_TYPES.TEXT));
        //console.log(VisualizationService.getByContextAndType(CONTEXT_TYPES.NODE, VIS_DATA_TYPES.TEXT));
        //console.log(VisualizationService.getNamesByContextAndType(null, VIS_DATA_TYPES.TEXT));
        //console.log(VisualizationService.getNamesByContextAndType(CONTEXT_TYPES.EDGE, null));
        //
        //console.log(vis);
        var V = Object.create( vis.prototype );
        //var V = new vis();
            V.render(data, DataConverter.fromTextOccMapToArray, "#svgContainer");
    });
});