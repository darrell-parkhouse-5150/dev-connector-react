import { Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule, FormsModule} from "@angular/forms";

@Component({
  selector: 'ng-new-todo',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
    ],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.scss'
})
export class NewTodoComponent {
    public newTodoForm: FormGroup = new FormGroup({

    });
    public title: string = 'Add New Todo';
}
