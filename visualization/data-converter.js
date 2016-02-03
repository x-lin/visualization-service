/**
 * Service used for converting data fetched from the data source (DB) to a format usable for the respective visualizations.
 * Each converter takes as an input, the raw data and returns as the output, the data suitable for a visualization.
 */
app.factory('DataConverter',function(
){
    var converter = {};

    /**
     * Converts a map consisting of keywords and occurrences {keyword1: 100, keyword2: 98,...} to an bounded
     * array consisting of elements with size and text: [{text: keyword1, size: 100}, {text: keyword2, size: 98}, ...].
     * This converter is useful for visualizations such as the word cloud.
     *
     * @param data data to be converted
     * @returns {Array.<T>} data that was converted to an array
     */
    converter.fromTextOccMapToArray = function(data) {
        //simulating results from db
        data = [data];

        //fetch maximum value
        var max = Math.max.apply(Math, Object.keys(data[0]).map(function(k) {return data[0][k]}));

        var maxFontsize = 50;
        var ratio = maxFontsize / max;

        //start filtering out objects, if threshold is surpassed; done to keep wordcloud somewhat lucid and
        //to speeding up rendering
        var threshold = 100;
        var filter = Object.keys(data[0]).length > threshold;

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

    return converter;

});