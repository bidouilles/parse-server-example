
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

// curl -X POST  -H "X-Parse-Application-Id: jgsmYMDxtIMDH8YTGVK9FXHyIg65zBsb653DjS57"  -H "X-Parse-REST-API-Key: IynfTy1Nu3DRLMKyI22Pj4u38JOUuauAkc2TClLa"  -H "Content-Type: application/json"  -d "{\"name\": \"test\", \"order\": \"AAAAAA\", \"price\": 1000, \"quantity\": 10}"  https://api.parse.com/1/classes/Bill

var ReceiptsDetail = Parse.Object.extend("Bill");
var Receipts = Parse.Object.extend("BillNumber");

Parse.Cloud.beforeSave("Bill", function(request, response) {
    if (!request.object.isNew()) {
      // Let existing object updates go through
      response.success();
    }
    var query = new Parse.Query(ReceiptsDetail);
    // Add query filters to check for uniqueness
    query.equalTo("order", request.object.get("order"));
    query.equalTo("slug", request.object.get("slug"));
    query.first().then(function(existingObject) {
      if (existingObject) {
        // Update existing object
        existingObject.set("quantity", request.object.get("quantity"));
        existingObject.set("price", request.object.get("price"));
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
      response.error("Error performing checks or saves.");
    });
});

// curl -X POST  -H "X-Parse-Application-Id: jgsmYMDxtIMDH8YTGVK9FXHyIg65zBsb653DjS57"  -H "X-Parse-REST-API-Key: IynfTy1Nu3DRLMKyI22Pj4u38JOUuauAkc2TClLa"  -H "Content-Type: application/json"  -d "{\"company\": \"test\", \"type\": \"coin\", \"order\": \"AAAAAA\", \"total\": 10000, \"state\": 3}"  https://api.parse.com/1/classes/BillNumber

Parse.Cloud.beforeSave("BillNumber", function(request, response) {
    if (!request.object.isNew()) {
      // Let existing object updates go through
      response.success();
    }
    var query = new Parse.Query(Receipts);
    // Add query filters to check for uniqueness
    query.equalTo("order", request.object.get("order"));
    query.equalTo("company", request.object.get("company"));
    query.first().then(function(existingObject) {
      if (existingObject) {
        // Don't update existing object
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
      response.error("Error performing checks or saves.");
    });
});
