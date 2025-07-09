import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  protected formspree = "https://formspree.io/f/mvgrjyvr";
  name = '';
  email = '';
  message = '';

  onSubmit() {
    if (this.name && this.email && this.message) {
      alert('Message sent!');
      this.name = '';
      this.email = '';
      this.message = '';
    }
  }
}
