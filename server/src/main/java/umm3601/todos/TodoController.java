package umm3601.todos;

import com.mongodb.client.MongoDatabase;

import java.util.Map;

public class TodoController {

    public TodoController(MongoDatabase database) {

    }

    public String getTodo(String id) {
        return null;
    }

    public String getTodos(Map<String, String[]> queryParams) {
        return null;
    }

    public boolean addNewTodo(String owner,
                             String body,
                             boolean status,
                             String category) {
        return false;
    }

}
