package umm3601.todos;

import com.mongodb.BasicDBObject;
import com.mongodb.util.JSON;
import spark.Request;
import spark.Response;

public class TodoRequestHandler {
    private final TodoController todoController;

    public TodoRequestHandler(TodoController todoController) {
        this.todoController = todoController;
    }

    public String getTodoJSON(Request req, Response res) {
        res.type("application/json");
        String id = req.params("id");
        String todo;
        try {
            todo = todoController.getTodo(id);
        } catch (IllegalArgumentException e) {
            // This is thrown if the ID doesn't have the appropriate
            // form for a Mongo Object ID.
            // https://docs.mongodb.com/manual/reference/method/ObjectId/
            res.status(400);
            res.body("The requested todo id " + id + " wasn't a legal Mongo Object ID.\n" +
                "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
            return "";
        }
        if (todo != null) {
            return todo;
        } else {
            res.status(404);
            res.body("The requested todo with id " + id + " was not found");
            return "";
        }
    }

    public String getTodos(Request req, Response res) {
        res.type("application/json");
        return todoController.getTodos(req.queryMap().toMap());
    }

    public String addNewTodo(Request req, Response res){
        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if(o.getClass().equals(BasicDBObject.class))
            {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;

                    String owner = dbO.getString("owner");
                    String body = dbO.getString("body");
                    boolean status = dbO.getBoolean("status");
                    String category = dbO.getString("category");

                    System.err.println("Adding new user [owner=" + owner + ",  body=" + body +
                        " status=" + status + " category=" + category + ']');
                    return todoController.addNewTodo(owner, body, status, category);
                }
                catch(NullPointerException e)
                {
                    System.err.println("A value was malformed or omitted, new todo request failed.");
                    return null;
                }

            }
            else
            {
                System.err.println("Expected BasicDBObject, received " + o.getClass());
                return null;
            }
        }
        catch(RuntimeException ree)
        {
            ree.printStackTrace();
            return null;
        }
    }
}
