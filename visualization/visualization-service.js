/**
 * The visualization service fetches the visualizations that shall be registered to the registry from the VisualizationConfig.
 * It also exposes ome functions from the registry to the user.
 */
app.factory('VisualizationService',function(
    VisualizationRegistry,
    VisualizationConfig
){
    //returning variable
    var visService = {};

    {
        //fetches all visualization definitions from the VisConfig and registers them to the registry
        for(var visName in VisualizationConfig.visualizations) {
            var vis = VisualizationConfig.visualizations[visName];
            VisualizationRegistry.registerVisualization(vis.name, vis.prototype, vis.visContexts, vis.dataTypes);
        }
    }

    ////////////////////////////////
    //public functions//////////////
    ////////////////////////////////
    visService.getDataTypes = VisualizationRegistry.getDataTypes;
    visService.getVisualizationContexts = VisualizationRegistry.getVisualizationContexts;
    visService.getVisualization = VisualizationRegistry.getVisualization;
    visService.getNamesByContextAndType = VisualizationRegistry.getNamesByContextAndType;
    visService.getByContextAndType = VisualizationRegistry.getByContextAndType;

    return visService;
});