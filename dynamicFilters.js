//author - Jaspreet Singh
var newFilters = (function($) {
    var self = {};

    var timeRange = "5-12|12-17|17-24|0-5";
    var priceRangeKey = "0-200|200-400|400-600|600-800|800-250000";
    var flightClass = "ECONOMY|BUSINESS|PREMIUM"

    var getRanges = function(stringValue) {
        var ranges = {};
        ranges.selectedValues = [];
        var splitRanges = stringValue ? stringValue.split('|') : stringValue;
        if (splitRanges.length > 0) {
            $.each(splitRanges, function(key, value) {
                ranges['range' + (key + 1)] = {};
                ranges['range' + (key + 1)].values = value; //['range' + (key + 1)]
                ranges['range' + (key + 1)].found = false;
                if (value.indexOf('-') != -1) {
                    var minMax = value.split('-');
                    ranges['range' + (key + 1)].min = minMax[0];
                    ranges['range' + (key + 1)].max = minMax[1];
                }
            });
        }
        return ranges;
    };

    self.initNewFilters = function(objFilter) {
        objFilter.DepartureTime = getRanges(timeRange);
        objFilter.ArrivalTime = getRanges(timeRange);
        objFilter.PriceRange = getRanges(priceRangeKey);
        objFilter.FlightClass = getRanges(flightClass);
        return objFilter;
    };

    self.populateDynamic = function(ranges, compareValue) {
        $.each(ranges, function(key, value) {
            if (value.hasOwnProperty('found') && !value.found) {
                if (value.values.indexOf('-') == -1 && value.values == compareValue) {
                    value.found = true;
                    return false;
                } else {
                    var minMax = value.values.split('-');
                    if (compareValue > parseInt(minMax[0]) && compareValue <= parseInt(minMax[1])) {
                        value.found = true;
                        return false;
                    }
                }
            }
        });
    };

    self.checkRangeFilter = function(filterObj, actualVal) {
        var toBeAdded = false;
        if (filterObj.selectedValues && filterObj.selectedValues.length > 0) {
            $.each(filterObj.selectedValues, function(key, value) {
                if (actualVal > filterObj[value].min && actualVal < filterObj[value].max) {
                    toBeAdded = true;
                    return false;
                }
            });
        } else {
            toBeAdded = true;
        }
        return toBeAdded;
    }

    return self;
})(jQuery);