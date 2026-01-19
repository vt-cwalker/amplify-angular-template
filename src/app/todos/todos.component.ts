import { Component, OnInit } from '@angular/core';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
    selector: 'app-todos',
    imports: [],
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos: any[] = [];

  ngOnInit(): void {
    this.listTodos();
  }

  listTodos() {
    try {
      client.models.Todo.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.todos = items;
        },
      });
    } catch (error) {
      console.error('error fetching todos', error);
    }
  }

  createTodo() {
    try {
      client.models.Todo.create({
        content: window.prompt('Todo content'),
      });
      this.listTodos();
    } catch (error) {
      console.error('error creating todos', error);
    }
  }
}
