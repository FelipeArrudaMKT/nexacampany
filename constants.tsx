
import React from 'react';
import { Package } from './types';

export const PACKAGES: Package[] = [
  { id: '1pc', name: '1 peça', pieces: 1, price: 129.90 },
  { id: '2pcs', name: '2 peças', pieces: 2, price: 169.90 },
  { id: '3pcs', name: '3 peças', pieces: 3, price: 219.90 },
  { id: '4pcs', name: '4 peças', pieces: 4, price: 259.90 },
];

export const SIZES = [
  { label: 'M', weight: '60 – 74kg' },
  { label: 'G', weight: '75 – 94kg' },
  { label: 'GG (2XG)', weight: '95 – 135kg' },
];

export const FAQ_DATA = [
  {
    question: "Isso funciona sem eu treinar?",
    answer: "Sim. A regata foi desenvolvida para potencializar a queima de calorias em atividades normais do cotidiano — isso inclui movimentar-se no dia a dia (caminhar, subir escada, tarefas de casa...) — portanto, mesmo com pouco esforço você pode perceber aumento da sudorese e sensação de perda de medidas."
  },
  {
    question: "Vocês são confiáveis? E se eu pagar e não receber?",
    answer: "Somos totalmente confiáveis. Nossa principal modalidade é o Pagamento na Entrega, o que significa que você só paga quando o entregador estiver na sua porta com o seu produto em mãos. Risco zero para você!"
  },
  {
    question: "Posso abrir o pacote da encomenda antes de pagar quando chegar?",
    answer: "Sim! Você pode conferir se o produto está correto antes de efetuar o pagamento para o entregador."
  },
  {
    question: "Quanto tempo para ver resultado?",
    answer: "O efeito térmico é imediato. No primeiro uso você já sentirá o aumento da temperatura corporal e sudorese. Resultados estéticos variam de pessoa para pessoa, mas o uso frequente potencializa a perda de medidas."
  },
  {
    question: "Vocês realizam troca caso não tenha servido?",
    answer: "Sim, realizamos trocas sem problemas. Basta entrar em contato conosco pelo WhatsApp em até 7 dias após o recebimento."
  },
  {
    question: "Serei avisado quando a entrega (pedido) estiver chegando?",
    answer: "Sim, nossa equipe entra em contato via WhatsApp no dia da entrega para confirmar sua disponibilidade."
  },
  {
    question: "Qual é o tempo de entrega?",
    answer: "Nossa entrega é expressa! Em capitais e regiões metropolitanas, costumamos entregar em até 24 horas úteis."
  },
  {
    question: "Em quais dias e horários são feitas as entregas?",
    answer: "As entregas são feitas de segunda a sábado, das 8h às 18h."
  },
  {
    question: "A Regata é confortável? Incomoda?",
    answer: "Ela foi projetada com tecido Premium altamente confortável. No início você sente o calor, mas a malha é respirável e se adapta bem ao corpo."
  },
  {
    question: "Consigo usar outras roupas por cima da regata?",
    answer: "Sim, ela é discreta e poderosa. Pode ser usada por baixo de camisas, camisetas ou uniformes sem marcar."
  }
];
