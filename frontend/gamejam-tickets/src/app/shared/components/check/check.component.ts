import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [CommonModule], // Añadir CommonModule aquí
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {
  // Array para almacenar los checkboxes
  checkboxes = [
    { label: 'Tecnología', checked: false },
    { label: 'Eventos', checked: false },
    { label: 'Aceleración', checked: false },
    { label: 'Viajes', checked: false },
    { label: 'Fellows', checked: false }
  ];

  // Función para seleccionar solo un checkbox
  selectOnlyOne(index: number): void {
    this.checkboxes.forEach((checkbox, i) => {
      checkbox.checked = i === index;
    });
  }
}
