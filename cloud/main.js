
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

var Tasks = Parse.Object.extend("Tasks");

Parse.Cloud.beforeSave("Tasks", function(request, response) {
    if (!request.object.isNew()) {
      // Let existing object updates go through
      response.success();
    }
    var query = new Parse.Query(Tasks);
    // Add query filters to check for uniqueness
    query.equalTo("hash", request.object.get("hash"));
    query.first().then(function(existingObject) {
      if (existingObject) {
        // Update existing object
        existingObject.set("status", request.object.get("status"));
        existingObject.set("date", request.object.get("date"));
        existingObject.set("comment", request.object.get("comment"));
        return existingObject.save();
      } else {
        // Pass a flag that this is not an existing object
        return Parse.Promise.as(false);
      }
    }).then(function(existingObject) {
      if (existingObject) {
        // Existing object, stop initial save
        response.error("Existing object");
      } else {
        // New object, let the save go through
        response.success();
      }
    }, function (error) {
 console.warn(error.code + error.message);
    response.success();
    });
});
