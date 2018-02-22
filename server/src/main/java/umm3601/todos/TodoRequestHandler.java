package umm3601.todos;

import spark.Request;
import spark.Response;

public class TodoRequestHandler {
    private final TodoController todoController;

    public TodoRequestHandler(TodoController todoController) {
        this.todoController = todoController;
    }

    public String getTodoJSON(Request req, Response res) {
        return null;
    }

    public String getTodos(Request req, Response res) {
        return null;
    }

    public boolean addNewTodo(Request req, Response res){
        return false;
    }
}
