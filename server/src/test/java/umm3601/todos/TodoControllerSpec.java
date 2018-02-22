package umm3601.todos;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.*;


public class TodoControllerSpec {
    private TodoController todoController;

    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> todoDocuments = db.getCollection("todos");
        todoDocuments.drop();
        List<Document> testTodos = new ArrayList<>();

        // add insertions of todos
        testTodos.add(Document.parse("{\n" +
            "                    owner: \"Chris\",\n" +
            "                    status: false,\n" +
            "                    category: \"UMM\",\n" +
            "                    body: \"Chris is a happy person with no issues\"\n" +
            "                }"));

        testTodos.add(Document.parse("{\n" +
            "                    owner: \"Richard Nixon\",\n" +
            "                    status: false,\n" +
            "                    category: \"chores\",\n" +
            "                    body: \"Watergate\"\n" +
            "                }"));
        testTodos.add(Document.parse("{\n" +
            "                    owner: \"James Bond\", \n" +
            "                    status: false,\n" +
            "                    category: \"violence\",\n" +
            "                    body: \"Appear in a violent action movie\"" +
            "                   }"));

        todoDocuments.insertMany(testTodos);
        // this needs to be below the rest of the before method.
        todoController = new TodoController(db);
    }

    private BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry
            = CodecRegistries.fromProviders(Arrays.asList(
            new ValueCodecProvider(),
            new BsonValueCodecProvider(),
            new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }

    private static String getOwner(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("owner")).getValue();
    }

    @Test
    public void getAllTodos() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = todoController.getTodos(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        // add test assertions
        assertEquals("should be 3 todos", 3, docs.size());
        List<String> owners = docs
            .stream()
            .map(TodoControllerSpec::getOwner)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedOwners = Arrays.asList("Chris",
            "Richard Nixon",
            "James Bond");

        assertEquals("Names should match", expectedOwners, owners);
    }

    @Test
    public void getCompleteTodos() {
        Map<String, String[]> argMap = new HashMap<>();

        // add assertions and arguments for argMap
    }

    @Test
    public void addTodoTest() {
        // add body of method
    }

    @Test
    public void getTodoByCategory() {
        Map<String, String[]> argMap = new HashMap<>();
        // add body of method
    }
}
