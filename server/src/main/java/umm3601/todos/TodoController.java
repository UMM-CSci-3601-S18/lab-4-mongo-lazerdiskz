package umm3601.todos;

import com.google.gson.Gson;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.Map;

public class TodoController {

    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> todoCollection;

    public TodoController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        todoCollection = database.getCollection("todos");
    }

    public String getTodo(String id) {
        return null;
    }

    public String getTodos(Map<String, String[]> queryParams) {
        return null;
    }

    public String addNewTodo(String owner,
                             String body,
                             boolean status,
                             String category) {
        return null;
    }

}
