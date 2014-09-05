// Generated by CoffeeScript 1.7.1
var LocalDB, expect;

expect = require('expect.js');

LocalDB = require('../src/localdb.js');

describe('LocalDB', function() {
  var collection, db;
  it('LocalStorage Support', function() {
    return expect(LocalDB.isSupport()).to.be.ok();
  });
  it('Init DB', function() {
    var db;
    db = new LocalDB("db_foo");
    return expect(db).to.be.a("object");
  });
  it('Drop DB', function() {
    var db;
    db = new LocalDB("db_foo");
    return expect(db.drop()).to.be.ok();
  });
  db = new LocalDB("db_foo");
  it('Drop Collection By DB', function() {
    db.drop("collection_bar");
    return expect(collection.find().length).to.be(0);
  });
  it('Drop COllection By Collection', function() {
    var collection;
    collection = db.collection("collection_bar");
    collection.drop();
    return expect(collection.find().length).to.be(0);
  });
  collection = db.collection("collection_bar");
  it('Insert Data', function() {
    collection.insert({
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: "4",
        f: 5
      }
    });
    collection.insert({
      a: 2,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 3,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 4,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 5,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 6,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 7,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 8,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 10,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 11,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 12,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 13,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 14,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 15,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    return expect(collection.find().length).to.be(14);
  });
  it('Get Collections', function() {
    var collections;
    collections = db.collections();
    console.log(collections);
    return expect(db.collections()).to.be.a("array");
  });
  it('Get Collection', function() {
    collection = db.collection("collection_bar");
    return expect(collection).to.be.a("object");
  });
  it('Update Data', function() {
    collection.update({
      $set: {
        b: 4,
        c: 5
      }
    }, {
      criteria: {
        a: {
          $gt: 3,
          $lt: 10
        },
        d: {
          e: 4
        }
      }
    });
    expect(collection.find()[6].b).to.be(4);
    return expect(collection.find()[6].c).to.be(5);
  });
  it('find', function() {
    var data;
    data = collection.find({
      criteria: {
        a: {
          $lt: 3
        },
        b: 2
      },
      projection: {
        a: 1,
        b: 1,
        c: 0
      },
      limit: 4
    });
    console.log(data);
    return expect(data).to.be.a("array");
  });
  it('Fine One Data', function() {
    var data;
    data = collection.findOne({
      criteria: {
        a: {
          $lt: 3
        }
      }
    });
    console.log(data);
    return expect(data.length).to.be(1 || 0);
  });
  it('$in', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      criteria: {
        a: {
          $in: [3, 4, 5]
        }
      }
    });
    console.log(data);
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.a).to.be.within(3, 5));
    }
    return _results;
  });
  it('$nin', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      criteria: {
        a: {
          $nin: [3, 4, 5]
        }
      }
    });
    console.log(data);
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.a).not.to.be.within(3, 5));
    }
    return _results;
  });
  it('$and', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      criteria: {
        $and: [
          {
            b: 4
          }, {
            a: 5
          }
        ]
      }
    });
    console.log(data);
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.b).to.be(4));
    }
    return _results;
  });
  it('$not', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      criteria: {
        $not: {
          b: 4
        }
      }
    });
    console.log(data);
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.b).not.to.be(4));
    }
    return _results;
  });
  it('$nor', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      criteria: {
        $nor: [
          {
            b: 4
          }, {
            a: 1
          }, {
            a: 2
          }
        ]
      }
    });
    console.log(data);
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      expect(d.b).not.to.be(4);
      expect(d.a).not.to.be(1);
      _results.push(expect(d.a).not.to.be(2));
    }
    return _results;
  });
  it('$or', function() {
    var data;
    data = collection.find({
      criteria: {
        $or: [
          {
            a: 1
          }, {
            a: 2
          }
        ]
      }
    });
    console.log(data);
    return expect(data).to.be.eql([
      {
        "a": 1,
        "b": 2,
        "c": 3,
        "d": {
          "e": 4,
          "f": 5
        }
      }, {
        "a": 2,
        "b": 2,
        "c": 3,
        "d": {
          "e": 4,
          "f": 5
        }
      }
    ]);
  });
  it('$exist', function() {
    var d, data, _i, _j, _len, _len1, _results;
    data = collection.find({
      criteria: {
        a: {
          $exist: false
        }
      }
    });
    console.log(data);
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      expect(d.a != null).not.to.be.ok();
    }
    data = collection.find({
      criteria: {
        a: {
          $exist: true
        }
      }
    });
    console.log(data);
    _results = [];
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      d = data[_j];
      _results.push(expect(d.a != null).to.be.ok());
    }
    return _results;
  });
  it('$exist', function() {
    var data;
    data = collection.find({
      criteria: {
        a: {
          $type: "number"
        },
        b: {
          $type: "number"
        },
        d: {
          $type: "object",
          e: {
            $type: "string"
          }
        }
      }
    });
    console.log(data);
    return expect(data).to.be.eql([
      {
        "a": 1,
        "b": 2,
        "c": 3,
        "d": {
          "e": "4",
          "f": 5
        }
      }
    ]);
  });
  it('$mod', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      criteria: {
        a: {
          $mod: [4, 0]
        }
      }
    });
    console.log(data);
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.a % 4).to.be(0));
    }
    return _results;
  });
  return it('$regex', function() {
    var d, data, _i, _j, _len, _len1, _results;
    collection.insert({
      a: 15,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      },
      g: "Hello World"
    });
    data = collection.find({
      criteria: {
        g: {
          $regex: 'ello'
        }
      }
    });
    console.log(data);
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      expect(/ello/.test(d.g)).to.be.ok();
    }
    data = collection.find({
      criteria: {
        g: /ello/
      }
    });
    console.log(data);
    _results = [];
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      d = data[_j];
      _results.push(expect(/ello/.test(d.g)).to.be.ok());
    }
    return _results;
  });
});
