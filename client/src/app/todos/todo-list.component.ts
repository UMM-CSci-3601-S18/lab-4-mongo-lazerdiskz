import {Component, OnInit} from "@angular/core";
import {Todo} from "./todo";
import {TodoListService} from "./todo-list.service";
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';


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
    public todoID: string;
    public todoOwner: string;
    public todoStatus: boolean;
    public todoCategory: string;
    public todoBody: string;

    constructor(public todoListService: TodoListService, public dialog: MatDialog) {

    }

    public filterTodos(searchOwner: string, searchCategory: string, searchBody: string, searchStatus: boolean) {
        this.filteredTodos = this.todos;
    }

    ngOnInit(): void {

    }
}
