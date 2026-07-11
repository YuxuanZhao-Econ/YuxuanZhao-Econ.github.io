const codeCells = document.querySelectorAll('.jp-CodeCell, .code_cell');

codeCells.forEach((cell) => {
  const input = cell.querySelector('.jp-Cell-inputWrapper, .input');
  const code = input?.querySelector('pre');
  if (!input || !code) return;

  const lines = code.textContent.replace(/\n$/, '').split('\n').length;
  if (lines <= 12) return;

  const disclosure = document.createElement('details');
  disclosure.className = 'code-disclosure';

  const summary = document.createElement('summary');
  summary.innerHTML = `<span>Show code</span><span>${lines} lines</span>`;
  disclosure.append(summary);

  input.before(disclosure);
  disclosure.append(input);
});

const textOutputs = document.querySelectorAll(
  '.jp-OutputArea-output pre, .output_subarea pre'
);

textOutputs.forEach((output) => {
  if (output.closest('.output-disclosure')) return;

  const text = output.textContent.replace(/\n$/, '');
  const lines = text.split('\n').length;
  const iterations = (text.match(/outer iteration/gi) || []).length;

  // Keep concise results visible. Only long, plain-text logs are collapsed.
  if (lines <= 20 && iterations <= 3) return;

  const container = output.closest('.jp-OutputArea-output, .output_subarea');
  if (!container || container.querySelector('img, svg, table')) return;

  const disclosure = document.createElement('details');
  disclosure.className = 'output-disclosure';

  const summary = document.createElement('summary');
  const label = iterations > 3 ? 'Show iteration log' : 'Show full output';
  const detail = iterations > 3
    ? `${iterations} iterations · ${lines} lines`
    : `${lines} lines`;
  summary.innerHTML = `<span>${label}</span><span>${detail}</span>`;
  disclosure.append(summary);

  container.before(disclosure);
  disclosure.append(container);
});

