import { Injectable,signal } from '@angular/core';
export interface FAQ {
  pregunta: string;
  respuesta: string;
  id: string; // Para el target del acordeón
}
@Injectable({
  providedIn: 'root',
})
export class FAQService {

  // ... (tus señales de planes) ...

  private faqList = signal<FAQ[]>([
    {
      id: 'q1',
      pregunta: '¿Hay que pagar inscripción?',
      respuesta: '¡No! En LionGoldenFitness no cobramos matrícula ni inscripción. Solo pagás tu membresía y empezás.'
    },
    {
      id: 'q2',
      pregunta: '¿Puedo ir a cualquier sede?',
      respuesta: 'Sí, los planes Gold y Elite te permiten entrenar en todas nuestras sedes sin costo adicional.'
    },
    {
      id: 'q3',
      pregunta: '¿Cómo gestiono mis turnos?',
      respuesta: 'A través de nuestra plataforma web. Una vez registrado, podrás ver la disponibilidad y reservar tu lugar.'
    },
    {
      id: 'q4',
      pregunta: '¿Qué métodos de pago aceptan?',
      respuesta: 'Aceptamos efectivo, tarjetas de crédito/débito y transferencias bancarias.'
    }
  ]);

  getFAQs() {
    return this.faqList.asReadonly();
  }
}
  

