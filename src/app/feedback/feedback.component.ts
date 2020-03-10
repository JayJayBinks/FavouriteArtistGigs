import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {
    this.feedbackForm = this.formBuilder.group({
      email: [''],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      text: ['',  [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
  }

  get subject() { return this.feedbackForm.get('subject'); }

  get text() { return this.feedbackForm.get('text'); }

  submit() {
    this.log(this.getFormValues().join(' '));

    this.feedbackForm.reset();
  }

  private log(message: string) {
    this.messageService.add(`Feeddack: ${message}`);
  }

  private getFormValues(): string[] {
    const values = [];
    Object.keys(this.feedbackForm.controls).forEach(c => values.push(c + ': ' + this.feedbackForm.controls[c].value));
    return values;
  }
}
