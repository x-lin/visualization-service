/**
 * Specifies the interface for visualization objects.
 */
app.factory('BasicVisualization',function(
){

    /**
     * Constructor .
     *
     * @constructor
     */
    var BasicVisualization = function() {};

    /**
     * Specification of the basic render function. This function should be overwritten/implemented by all inherited
     * objects.
     *
     * @param data the data to be rendered from
     * @param convertFunc (optional) parameter, a convert function that converts the input data to the desired
     *          format for the visualization. If no conversion is needed, omit this parameter.
     * @param element overwrites the element property from the constructor
     * @param width overwrites the width property from the constructor
     * @param height overwrites the height property from the constructor
     */
    BasicVisualization.prototype.render = function(data, convertFunc, element, width, height) {
        throw new Error("Render function not specified in interface. Implement this function in your subtype.");
    };

    /**
     * Initialize object with some properties;
     *
     * @param element The DOM element the visualization is attached to. If nothing is specified, "body" is assumed.
     * @param width The width of the visualization plane. If no width value is specified, the width is set to 500.
     * @param height The height of the visualization plane. If no height value is specified, the height is set to 500.
     */
    BasicVisualization.prototype.initialize = function(element, width, height) {
        /** Width of canvas. */
        this.width = width === undefined ? 500 : width;

        /** Height of canvas. */
        this.height = height === undefined ? 500 : height;

        /** The element the visualization is appended to */
        this.element = element === undefined ? "body" : element;
    };

    /**
     * Will use the specified function to convert the data to the desired format. If none is specified, the original
     * data is returned.
     *
     * @param data the data to be converted
     * @param convertFunc a conversion function that converts the data to the desired format
     * @returns {*} the prepared data
     */
    BasicVisualization.prototype.convertIfExists = function(data, convertFunc) {
        if(!convertFunc) {
            data = convertFunc(data);
        }

        return data;
    }

    return BasicVisualization;
});