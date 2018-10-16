import { TodosModule } from './todos.module';

describe('TodosRoutingModule', () => {
  let todosModule: TodosModule;

  beforeEach(() => {
    todosModule = new TodosModule();
  });

  it('should create an instance', () => {
    expect(todosModule).toBeTruthy();
  });
});
