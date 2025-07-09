import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  form: FormGroup;
  submitting = false;
  submitted = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  this.form = this.fb.group({
    name: ['', Validators.required],
    _replyto: ['', [Validators.required, Validators.email]],  // Formspree expects this
    message: ['', Validators.required]
  });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = null;
    this.http.post('https://formspree.io/f/mvgrjyvr', this.form.value, {
      headers: { 'Accept': 'application/json' }
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.form.reset();
      },
      error: (err) => {
        this.submitting = false;
        this.error = 'Submission failed. Please try again.';
      }
    });
  }
}


