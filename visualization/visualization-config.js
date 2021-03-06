/**
 * Register your visualization properties here. This configuration is used by the VisualizationService to provide
 * users with visualizations.
 */
app.factory("VisualizationConfig", function(
    CONTEXT_TYPES,
    VIS_DATA_TYPES,
    VIS_NAMES,
    WordCloud,
    Icicle
) {
    var config = {};

    //property where all visualization infos are stored
    config.visualizations = {};

    /**
     * Creates a visualization entry.
     *
     * @param name the name of the visualization
     * @param prototype the prototype definition of the visualization
     * @param visContexts the block contexts this visualization should handle
     * @param dataTypes the data types this visualization should handle
     * @returns {{name: *, prototype: *, visContexts: *, dataTypes: *}}
     */
    var createVisObject = function(name, prototype, visContexts, dataTypes) {
        return {
            name : name,
            prototype : prototype,
            visContexts : visContexts,
            dataTypes : dataTypes
        }
    }

    /////////////////////////////////////////////////////////////////////////////
    //enter the visualization configurations here////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    config.visualizations.WordCloud =
        createVisObject(VIS_NAMES.WORD_CLOUD, WordCloud, [CONTEXT_TYPES.NODE, CONTEXT_TYPES.EDGE], [VIS_DATA_TYPES.TEXT]);

    config.visualizations.Icicle =
        createVisObject(VIS_NAMES.ICICLE, Icicle, [CONTEXT_TYPES.NODE, CONTEXT_TYPES.EDGE, CONTEXT_TYPES.GRAPH],
            [VIS_DATA_TYPES.HIERARCHY, VIS_DATA_TYPES.SCHEMA]);


    return config;
});