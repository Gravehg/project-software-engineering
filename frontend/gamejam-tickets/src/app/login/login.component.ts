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
import Swal from 'sweetalert2';

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
      ).subscribe({
        next: (res) => {
          if (res.success) {
            this.triggerSuccess();
          } else {
            this.triggerFailure();
          }
        },
        error: () => {
          this.triggerFailure();
        },
      });
    }
  }

  triggerSuccess() {
    const translatedTitle = this.translate.instant('SUCCESS_LOGIN_ALERT_TITLE');
    const translatedText = this.translate.instant('SUCCESS_LOGIN_ALERT_TEXT');
    Swal.fire({
      icon: 'success',
      title: translatedTitle,
      text: translatedText,
    });
  }

  triggerFailure() {
    const translatedTitle = this.translate.instant('FAILURE_LOGIN_ALERT_TITLE');
    const translatedText = this.translate.instant('FAILURE_LOGIN_ALERT_TEXT');
    Swal.fire({
      icon: 'error',
      title: translatedTitle,
      text: translatedText,
    });
  }

  onLanguageChange(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translateText(selectedLanguage);
  }
  translateText(lang: string) {
    this.translate.use(lang);
  }
}
