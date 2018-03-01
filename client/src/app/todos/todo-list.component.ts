import {Component, OnInit} from "@angular/core";
import {Todo} from "./todo";
import {TodoListService} from "./todo-list.service";
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {AddTodoComponent} from "./add-todo.component";


@Component({
    selector: 'todo-list-component',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
})

export class TodoListComponent implements OnInit {

    public todos: Todo[];
    public filteredTodos: Todo[];

    // These are the target values used in searching.
    // We should rename them to make that clearer.
    public searchTodoID: string;
    public searchTodoOwner: string;
    public searchTodoStatus: string;
    public searchTodoCategory: string;
    public searchTodoBody: string;

    private highlightedID: {'$oid': string} = { '$oid': '' };

    constructor(public todoListService: TodoListService, public dialog: MatDialog) {

    }

    isHighlighted(todo: Todo): boolean {
        return todo._id['$oid'] === this.highlightedID['$oid'];
    }

    openDialog(): void {
        const newTodo: Todo = {_id: '', owner: '', status: false, body: '', category: ''};
        const dialogRef = this.dialog.open(AddTodoComponent, {
            width: '500px',
            data: { todo: newTodo }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.todoListService.addNewTodo(result).subscribe(
                result => {
                    this.highlightedID = result;
                    this.refreshTodos();
                },
                err => {
                    // This should probably be turned into some sort of meaningful response.
                    console.log('There was an error adding the user.');
                    console.log('The error was ' + JSON.stringify(err));
                });
        });
    }

    public filterTodos(searchOwner: string, searchCategory: string, searchBody: string, searchStatus: string): Todo[] {
        this.filteredTodos = this.todos;

        if (searchCategory != null) {
            searchCategory = searchCategory.toLocaleLowerCase();

            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchCategory || todo.category.toLowerCase().indexOf(searchCategory) !== -1;
            });
        }

        if(searchBody != null) {
            searchBody = searchBody.toLocaleLowerCase();

            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchBody || todo.body.toLowerCase().indexOf(searchBody) !== -1;
            });
        }

        // Filter by status
        if (searchStatus != null) {

            let theStatus: boolean;

            if (searchStatus === "complete") {
                theStatus = true;

            } else if (searchStatus === "incomplete") {
                theStatus = false;

            } else {
                return this.filteredTodos;
            }

            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchStatus || todo.status === Boolean(theStatus);
            });
        }

        return this.filteredTodos;
    }

    refreshTodos(): Observable<Todo[]> {
        // Get Users returns an Observable, basically a "promise" that
        // we will get the data from the server.
        //
        // Subscribe waits until the data is fully downloaded, then
        // performs an action on it (the first lambda)

        const todos: Observable<Todo[]> = this.todoListService.getTodos();
        todos.subscribe(
            todos => {
                this.todos = todos;
                this.filterTodos(this.searchTodoOwner,
                    this.searchTodoCategory,
                    this.searchTodoBody,
                    this.searchTodoStatus);
            },
            err => {
                console.log(err);
            });
        return todos;
    }


    loadService(): void {
        this.todoListService.getTodos(this.searchTodoOwner).subscribe(
            todos => {
                this.todos = todos;
                this.filteredTodos = this.todos;
            },
            err => {
                console.log(err);
            }
        );
    }

    ngOnInit(): void {
        this.refreshTodos();
        this.loadService();
    }
}
