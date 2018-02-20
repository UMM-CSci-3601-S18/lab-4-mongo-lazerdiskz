## Questions

1. :question: What do we do in the `Server` and `UserController` constructors
to set up our connection to the development database?
1. :question: How do we retrieve a user by ID in the `UserController.getUser(String)` method?
1. :question: How do we retrieve all the users with a given age 
in `UserController.getUsers(Map...)`? What's the role of `filterDoc` in that
method?
1. :question: What are these `Document` objects that we use in the `UserController`? 
Why and how are we using them?
1. :question: What does `UserControllerSpec.clearAndPopulateDb` do?
1. :question: What's being tested in `UserControllerSpec.getUsersWhoAre37()`?
How is that being tested?
1. :question: Follow the process for adding a new user. What role do `UserController` and 
`UserRequestHandler` play in the process?

## Your Team's Answers

1. In the server, we create a new Mongo Client. We then declare a new MongoDB that uses the Mongo Client to get the database we want from a DB name. Then, in UserController, we pass it a Mongo DB in its constructor to load all the data in the collection users into a MongoCollection of (presumably) JSON objects. This collection allows us to query the database. 
1. We find everything in user collection that has the id we want and we put those in a variablenames jsonUsers. Then we take the first object with that id and return it.
1. We construct a new Document that represents the filters we wants on our data. When an age parameter is included in the query, we add to the Document filter conditions that tell the userCollection at the end to find things only matching the age provided.
1. filterDoc is a collection of filters that we use to tell the database in one go exactly the criteria we want the returned data to meet.
1. Documents are collections of key-value pairs with the keys being strings and the values being any kind of object. We're using them to store JSON objects and the filter criteria -- the former usually with an Iterable.
1. Registers a database and populates a collection with the user collection. Then it removes all entries in the collection. It then adds users into a list then adds them into the collection of documents. Then we construct a user controller with the data from the database.
1. 
