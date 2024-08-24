import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  translate: TranslateService = inject(TranslateService);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(public UserService: UserService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.UserService.login(
        this.loginForm.value.email ? this.loginForm.value.email : ''
      ).subscribe((res) => {
        alert(res.msg);
      });
    }
  }

  onLanguageChange(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translateText(selectedLanguage);
  }
  translateText(lang: string) {
    this.translate.use(lang);
  }
}
