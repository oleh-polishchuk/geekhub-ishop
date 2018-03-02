/**
 * Generate ID for image
 */
module.exports.generateUniqueName = function () {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var str = (new Date()).getTime();
    for( var i=0; i < 21; i++ ) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
};