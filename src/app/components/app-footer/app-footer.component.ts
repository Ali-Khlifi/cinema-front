import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent {
  version = environment.version;
  buildDate = (environment as any).buildDate || 'dev';
  currentYear = new Date().getFullYear();
}

