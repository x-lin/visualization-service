/**
 * Register your visualization properties here. This configuration is used by the VisualizationService to provide
 * users with visualizations.
 */
config.factory("VisualizationConfig", function(
    CONTEXT_TYPES,
    VIS_DATA_TYPES,
    VIS_NAMES,
    WordCloud
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
        createVisObject(VIS_NAMES.WORD_CLOUD, WordCloud, [CONTEXT_TYPES.NODE, CONTEXT_TYPES.EDGE], [VIS_DATA_TYPES.TEXT])


    return config;
});