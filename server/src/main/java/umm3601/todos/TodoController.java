package umm3601.todos;

import com.google.gson.Gson;
import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

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
        FindIterable<Document> jsonUsers
            = todoCollection
            .find(eq("_id", new ObjectId(id)));

        Iterator<Document> iterator = jsonUsers.iterator();
        if (iterator.hasNext()) {
            Document todo = iterator.next();
            return todo.toJson();
        } else {
            // We didn't find the desired user
            return null;
        }
    }

    public String getTodos(Map<String, String[]> queryParams) {
        Document filterDoc = new Document();

        if (queryParams.containsKey("owner")) {
            String targetContent = (queryParams.get("owner")[0]);
            Document contentRegQuery = new Document();
            contentRegQuery.append("$regex", targetContent);
            contentRegQuery.append("$options", "i");
            filterDoc = filterDoc.append("owner", contentRegQuery);
        }

        //FindIterable comes from mongo, Document comes from Gson
        FindIterable<Document> matchingUsers = todoCollection.find(filterDoc);

        return JSON.serialize(matchingUsers);
    }

    public String addNewTodo(String owner,
                             String body,
                             boolean status,
                             String category) {
        Document newTodo = new Document();
        try {
            todoCollection.insertOne(newTodo);
            ObjectId id = newTodo.getObjectId("_id");
            System.err.println("Successfully added new user [_id=" + id + ", owner=" + owner + ", status=" + status
                + " body=" + body + " category=" + category + ']');
            // return JSON.serialize(newUser);
            return JSON.serialize(id);
        } catch(MongoException me) {
            me.printStackTrace();
            return null;
        }
    }

}
