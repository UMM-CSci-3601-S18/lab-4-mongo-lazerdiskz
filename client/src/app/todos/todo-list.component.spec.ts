import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {CustomModule} from '../custom.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
import {MatDialog} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

describe('Todo list', () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach( () => {
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    _id: "chris_id",
                    owner: "Chris",
                    status: true,
                    category: "video games",
                    body: "He's got a body. At least one."
                },
                {
                    _id: "pat_id",
                    owner: "Pat",
                    status: false,
                    category: "groceries",
                    body: "Get ingredients for a stir-fry."
                },
                {
                    _id: "nic_id",
                    owner: "Nic",
                    status: false,
                    category: "video games",
                    body: "He's got a body. Sure does."
                }
            ])
        };

        TestBed.configureTestingModule( {
            imports: [CustomModule],
            declarations: [TodoListComponent],

            providers: [{provide: TodoListService, useValue: todoListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async( () => {
        TestBed.compileComponents().then( () => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the todos", () => {
        expect(todoList.todos.length).toBe(3);
    });

    it("contains two incomplete todos", () => {
        expect(todoList.filterTodos(null, null, null, "false").length === 2);
    });

    it("contains two todos with body fields with the word 'body' in them.", () => {
        expect(todoList.filterTodos(null, null, "body", null).length === 2);
    });

    it("contains a todo with the category 'groceries' in it", () => {
       expect(todoList.filterTodos(null, "groceries", null, null).length === 1);
    });

    it("contains one todo that is complete", () => {
        expect((todoList.filterTodos(null, null, null, "false")).length === 1);
        });
});
