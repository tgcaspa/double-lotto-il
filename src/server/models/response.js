/**
 * Created by ghost-dev on 1/27/2017.
 */

let _modelSuccess = {
    "success": {
        "status": 200
    },
    "data": [],
    "message": "Response message"
};

let _modelError = {
    "error": {
        "status": 400,
        "message": "Bad request - error message"
    },
    "message": "Response message"
};

function Response() {}

Response.prototype.pack = function (error, data, message) {
    switch( this.detectType(error) ){
        case "success":
            return this.success(data, message);
        case "error":
            return this.error(data, message);
    }
}

Response.prototype.detectType = function (error) {
    return (error) ? "error" : "success";
}

Response.prototype.success = function (data, message) {
    let r = _modelSuccess;
    r.data = data || [];
    r.message = message || "Response message";
    return r;
}

Response.prototype.error = function (data, message) {
    let r = _modelError;
    r.error = data || [];
    r.message = message || "Response message";
    return r;
}

module.exports = new Response;