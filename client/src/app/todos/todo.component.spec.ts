import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs/Observable';

describe('Todo component', () => {

    let todoComponent: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;


 // need to update these fields for the tests a
 // and add more tests

    let todoListServiceStub: {
        getTodoById: (todoId: string) => Observable<Todo>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodoById: (todoId: string) => Observable.of([
                {
                    _id: 'chris_id',
                    owner: 'Chris',
                    status: false,
                    category: 'groceries',
                    body: 'ramen'
                },
                {
                    _id: 'george_id',
                    owner: 'George',
                    status: true,
                    category: 'video games',
                    body: 'play 9001 hours of Dragonball Fighter Z'
                },
                {
                    _id: 'leah_id',
                    owner: 'Leah',
                    status: false,
                    category: 'groceries',
                    body: 'fuji apples, caramel sauce'
                }
            ].find(todo => todo._id === todoId))
        };

        TestBed.configureTestingModule({
            declarations: [TodoComponent],
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoComponent);
            todoComponent = fixture.componentInstance;
        });
    }));


    it('can retrieve George by ID', () => {
        todoComponent.setId('george_id');
        expect(todoComponent.todo).toBeDefined();
        expect(todoComponent.todo.owner).toBe('George');
        expect(todoComponent.todo.body).toBe('play 9001 hours of Dragonball Fighter Z');
    });

    it('can retrieve Leah by ID', () => {
       todoComponent.setId('leah_id');
       expect(todoComponent.todo).toBeDefined();
       expect(todoComponent.todo.owner).toBe('Leah');
       expect(todoComponent.todo.status).toBe(false);
    });

    it('returns undefined for Santa', () => {
        todoComponent.setId('santa_id');
        expect(todoComponent.todo).not.toBeDefined();
    });


});
