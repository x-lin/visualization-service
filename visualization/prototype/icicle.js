app.factory('Icicle',function(
    BasicVisualization){

    //returning variable
    var WordCloud = {};

    // setting up the inheritance
    WordCloud.prototype = Object.create( BasicVisualization.prototype );

    /**
     * Renders a D3 word cloud for the given data. The word cloud expects an array:
     * [
     *
     * ]
     *
     * Make sure, that the passed data is in this format.
     *
     * @param data
     */
    WordCloud.prototype.render = function(data, convertFunc, element, width, height) {
        this.initialize(element, width, height);

        var array = this.convertIfExists(data, convertFunc);

        var fill = d3.scale.category20();

        var that = this;

        var linearScale = d3.scale.linear()
            .domain([
                d3.min(array, function(d) { return d.size; }),
                d3.max(array, function(d) { return d.size; })
            ])
            .range([10,100]);

        d3.layout.cloud().size([this.width, this.height])
            .words(array)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .fontSize(function(d) { return linearScale(d.size); })
            .on("end", draw)
            .start();

        function draw(words) {
            d3.select(that.element).insert("svg", ":first-child")
                .attr("width", that.width)
                .attr("height", that.height)
                .append("g")
                .attr("transform", "translate(" + that.width/2 + "," + that.height/2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) {return d.size + "px"; })
                .style("font-family", "sans-serif")
                .style("font-weight", "bold")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }

    };

    return WordCloud;
});