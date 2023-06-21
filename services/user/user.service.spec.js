'use strict';

describe('User', function() {
  var $httpBackend;
  var User;
  var usersData = [
    {name: 'User X'},
    {name: 'User Y'},
    {name: 'User Z'}
  ];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `User` service before each test
  beforeEach(module('core.user'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _User_) {
    $httpBackend = _$httpBackend_;
    // $httpBackend.expectGET('users/users.json').respond(usersData);

    User = _User_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the users data from `/users/users.json`', function() {
    var users = User.query();

    expect(users).toEqual([]);

    $httpBackend.flush();
    expect(users).toEqual(usersData);
  });

});
