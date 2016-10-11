'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Itemlab = mongoose.model('Itemlab'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  itemlab;

/**
 * Itemlab routes tests
 */
describe('Itemlab CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Itemlab
    user.save(function () {
      itemlab = {
        name: 'Itemlab name'
      };

      done();
    });
  });

  it('should be able to save a Itemlab if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Itemlab
        agent.post('/api/itemlabs')
          .send(itemlab)
          .expect(200)
          .end(function (itemlabSaveErr, itemlabSaveRes) {
            // Handle Itemlab save error
            if (itemlabSaveErr) {
              return done(itemlabSaveErr);
            }

            // Get a list of Itemlabs
            agent.get('/api/itemlabs')
              .end(function (itemlabsGetErr, itemlabsGetRes) {
                // Handle Itemlabs save error
                if (itemlabsGetErr) {
                  return done(itemlabsGetErr);
                }

                // Get Itemlabs list
                var itemlabs = itemlabsGetRes.body;

                // Set assertions
                (itemlabs[0].user._id).should.equal(userId);
                (itemlabs[0].name).should.match('Itemlab name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Itemlab if not logged in', function (done) {
    agent.post('/api/itemlabs')
      .send(itemlab)
      .expect(403)
      .end(function (itemlabSaveErr, itemlabSaveRes) {
        // Call the assertion callback
        done(itemlabSaveErr);
      });
  });

  it('should not be able to save an Itemlab if no name is provided', function (done) {
    // Invalidate name field
    itemlab.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Itemlab
        agent.post('/api/itemlabs')
          .send(itemlab)
          .expect(400)
          .end(function (itemlabSaveErr, itemlabSaveRes) {
            // Set message assertion
            (itemlabSaveRes.body.message).should.match('Please fill Itemlab name');

            // Handle Itemlab save error
            done(itemlabSaveErr);
          });
      });
  });

  it('should be able to update an Itemlab if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Itemlab
        agent.post('/api/itemlabs')
          .send(itemlab)
          .expect(200)
          .end(function (itemlabSaveErr, itemlabSaveRes) {
            // Handle Itemlab save error
            if (itemlabSaveErr) {
              return done(itemlabSaveErr);
            }

            // Update Itemlab name
            itemlab.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Itemlab
            agent.put('/api/itemlabs/' + itemlabSaveRes.body._id)
              .send(itemlab)
              .expect(200)
              .end(function (itemlabUpdateErr, itemlabUpdateRes) {
                // Handle Itemlab update error
                if (itemlabUpdateErr) {
                  return done(itemlabUpdateErr);
                }

                // Set assertions
                (itemlabUpdateRes.body._id).should.equal(itemlabSaveRes.body._id);
                (itemlabUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Itemlabs if not signed in', function (done) {
    // Create new Itemlab model instance
    var itemlabObj = new Itemlab(itemlab);

    // Save the itemlab
    itemlabObj.save(function () {
      // Request Itemlabs
      request(app).get('/api/itemlabs')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Itemlab if not signed in', function (done) {
    // Create new Itemlab model instance
    var itemlabObj = new Itemlab(itemlab);

    // Save the Itemlab
    itemlabObj.save(function () {
      request(app).get('/api/itemlabs/' + itemlabObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', itemlab.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Itemlab with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/itemlabs/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Itemlab is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Itemlab which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Itemlab
    request(app).get('/api/itemlabs/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Itemlab with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Itemlab if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Itemlab
        agent.post('/api/itemlabs')
          .send(itemlab)
          .expect(200)
          .end(function (itemlabSaveErr, itemlabSaveRes) {
            // Handle Itemlab save error
            if (itemlabSaveErr) {
              return done(itemlabSaveErr);
            }

            // Delete an existing Itemlab
            agent.delete('/api/itemlabs/' + itemlabSaveRes.body._id)
              .send(itemlab)
              .expect(200)
              .end(function (itemlabDeleteErr, itemlabDeleteRes) {
                // Handle itemlab error error
                if (itemlabDeleteErr) {
                  return done(itemlabDeleteErr);
                }

                // Set assertions
                (itemlabDeleteRes.body._id).should.equal(itemlabSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Itemlab if not signed in', function (done) {
    // Set Itemlab user
    itemlab.user = user;

    // Create new Itemlab model instance
    var itemlabObj = new Itemlab(itemlab);

    // Save the Itemlab
    itemlabObj.save(function () {
      // Try deleting Itemlab
      request(app).delete('/api/itemlabs/' + itemlabObj._id)
        .expect(403)
        .end(function (itemlabDeleteErr, itemlabDeleteRes) {
          // Set message assertion
          (itemlabDeleteRes.body.message).should.match('User is not authorized');

          // Handle Itemlab error error
          done(itemlabDeleteErr);
        });

    });
  });

  it('should be able to get a single Itemlab that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Itemlab
          agent.post('/api/itemlabs')
            .send(itemlab)
            .expect(200)
            .end(function (itemlabSaveErr, itemlabSaveRes) {
              // Handle Itemlab save error
              if (itemlabSaveErr) {
                return done(itemlabSaveErr);
              }

              // Set assertions on new Itemlab
              (itemlabSaveRes.body.name).should.equal(itemlab.name);
              should.exist(itemlabSaveRes.body.user);
              should.equal(itemlabSaveRes.body.user._id, orphanId);

              // force the Itemlab to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Itemlab
                    agent.get('/api/itemlabs/' + itemlabSaveRes.body._id)
                      .expect(200)
                      .end(function (itemlabInfoErr, itemlabInfoRes) {
                        // Handle Itemlab error
                        if (itemlabInfoErr) {
                          return done(itemlabInfoErr);
                        }

                        // Set assertions
                        (itemlabInfoRes.body._id).should.equal(itemlabSaveRes.body._id);
                        (itemlabInfoRes.body.name).should.equal(itemlab.name);
                        should.equal(itemlabInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Itemlab.remove().exec(done);
    });
  });
});
