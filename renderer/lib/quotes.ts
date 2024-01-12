const frasesFoco = [
  'Mantenha o foco.',
  'Um passo de cada vez.',
  'Concentre-se no presente.',
  'Evite distrações.',
  'Persista e prevaleça.',
  'Ação gera progresso.',
  'Foco leva ao sucesso.',
  'Respire e continue.',
  'Visualize sua meta.',
  'Disciplina é liberdade.',
  'Seja intencional.',
  'Priorize tarefas.',
  'Mantenha a direção.',
  'Evite multitarefas.',
  'Concentre-se no essencial.',
  'Mantenha a consistência.',
  "Lembre-se do seu 'porquê'.",
  'Evite a procrastinação.',
  'Foco no processo.',
  'A cada tarefa, dedicação.',
];

export function randomQuote() {
  return frasesFoco[Math.floor(Math.random() * frasesFoco.length)];
}
