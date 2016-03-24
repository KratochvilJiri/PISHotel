var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
    // Map filter properties to mongo properties
    mapFilter: function (filter) {
        // Iterate through properties
        for (var key in filter) {
            // Check if really objects property
            if (filter.hasOwnProperty(key)) {
                // We have to map _id to ObjectId
                if (key.indexOf("_id") > -1) {
                    filter[key] = new ObjectId(filter[key]);
                }
            }
        }

        // Return result
        return filter;
    }
}