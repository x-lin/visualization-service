app.factory('VisualizationRegistry',function(
    CONTEXT_TYPES,
    VIS_DATA_TYPES
){
    //returning variable
    var registry = {};

    //local variables
    var internalRegistry,
        dataTypeIndex,
        visContextIndex;

    //init local variables
    {
        internalRegistry = {};
        dataTypeIndex = {};
        visContextIndex = {};

        for(var element in VIS_DATA_TYPES) {
            dataTypeIndex[element] = [];
        }

        for(element in CONTEXT_TYPES) {
            visContextIndex[element] = [];
        }
    }
    //
    //    for(var i = 0; i < registry.dataTypes.length; i++) {
    //        dataTypeIndex[registry.dataTypes[i]] = [];
    //    }
    //
    //    for(i = 0; i < registry.visContexts.length; i++) {
    //        visContextIndex[registry.visContexts[i]] = [];
    //    }
    //}

    ////////////////////////////////
    //private functions///////////////
    ////////////////////////////////

    var registerToInternalRegistry = function(name, prototype, visContexts, dataTypes) {
        internalRegistry[name] = {
            "prototype" : prototype,
            "visContexts" : visContexts,
            "dataTypes" : dataTypes
        }
    };

    var addToDataTypeIndex = function(name, dataTypes) {
        for(var i = 0; i < dataTypes.length; i++) {
            dataTypeIndex[dataTypes[i]].push(name);
        }
    };

    var addToVisContextIndex = function(name, visContexts) {
        for(var i = 0; i < visContexts.length; i++) {
            visContextIndex[visContexts[i]].push(name);
        }
    };

    var checkAndReturnSet = function(type, object) {
        if(!type) {
            throw new Error("Type " + type + " is undefined.");
        }

        if(Array.isArray(type)) {
            for(var i = 0; i < type.length; i++) {
                if(!object.hasOwnProperty([type[i]])) {
                    throw new Error("Type " + type[i] +  " does not exist. Valid types are: " + object);
                }
            }
        } else {
            if(!object.hasOwnProperty(type)) {
                throw new Error("Type " + type +  " does not exist. Valid types are: " + object)
            } else {
                type = [type];
            }
        }

        return type;
    };

    ////////////////////////////////
    //public functions//////////////
    ////////////////////////////////

    registry.registerVisualization = function(name, prototype, visContexts, dataTypes) {
        visContexts = checkAndReturnSet(visContexts, CONTEXT_TYPES);
        dataTypes = checkAndReturnSet(dataTypes, VIS_DATA_TYPES);

        //everything is ok, register visualization object to registry
        registerToInternalRegistry(name, prototype, visContexts, dataTypes);

        //add them to indices to speed up lookups
        addToDataTypeIndex(name, dataTypes);
        addToVisContextIndex(name, visContexts);
    };

    /**
     * Returns the data types identified by the visualization name;
     *
     * @param name
     * @returns {*|Array}
     */
    registry.getDataTypes = function(name) {
        return internalRegistry[name].dataTypes;
    };

    /**
     * Returns the visualization contexts identified by the visualization name.
     *
     * @param name
     * @returns {Array}
     */
    registry.getVisualizationContexts = function(name) {
        return internalRegistry[name].visContexts;
    };

    /**
     * Returns the visualization object identified by the name.
     *
     * @param name
     * @returns {*}
     */
    registry.getVisualization = function(name) {
        return internalRegistry[name].prototype;
    };

    registry.getRegistry = function() {
        return internalRegistry;
    };

    registry.getNamesByContextAndType = function(visContext, dataType) {
        var results;

        if(!visContext && !dataType) {
            throw new Error("Specify at least one context or type.");
        } else if(visContext) {
            results = visContextIndex[visContext];

            if(!dataType && !results) {
                results.filter(function(n) {
                    return dataTypeIndex[dataType].indexOf(n) !== -1;
                });
            }
        } else if(dataType) {
            results = dataTypeIndex[dataType];
        }

        return results;
    };

    /**
     * Get all visualizations that apply to a visualization context and/or data type.
     *
     * @param visContext a string specifying the visualization context
     * @param dataType a string specifying the data type
     * @returns {Array} an array with the matching visualizations
     */
    registry.getByContextAndType = function(visContext, dataType) {
        var visualizations = [];
        var namesArray = registry.getNamesByContextAndType(visContext, dataType);

        if(typeof namesArray !== "undefined") {
            for(var i = 0; i < namesArray.length; i++) {
                visualizations.push(registry.getVisualization(namesArray[i]));
            }
        }

        return visualizations;
    };

    return registry;
});