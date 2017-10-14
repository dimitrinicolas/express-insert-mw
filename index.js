function flattenArray(array, condition) {

    var flattened = [];

    if (typeof condition !== 'function') {
        condition = function() { return true; }
    }

    if (Object.prototype.toString.call(array) === '[object Array]') {
        for (var i = 0; i < array.length; i++) {
            if (Object.prototype.toString.call(array[i]) === '[object Array]') {
                var toPush = flattenArray(array[i], condition);
                for (var j = 0; j < toPush.length; j++) {
                    if (condition(toPush[j])) {
                        flattened.push(toPush[j]);
                    }
                }
            }
            else {
                if (condition(array[i])) {
                    flattened.push(array[i]);
                }
            }
        }
    }
    else {
        if (condition(array)) {
            flattened.push(array);
        }
    }

    return flattened;

}

function insertMiddleware(req, res, mw, last) {

    var mwList = flattenArray(mw, function(el) {
        return typeof el === 'function';
    });

    if (typeof last === 'function') {
        mwList.push(last);
    }

    if (mwList.length > 0) {
        mwList[0](req, res, function(req, res, mwList, last) {
            return function() {
                insertMiddleware(req, res, mwList.splice(1, mwList.length - 1), last);
            };
        }(req, res, mwList, last))
    }

}

exports = module.exports = insertMiddleware;
