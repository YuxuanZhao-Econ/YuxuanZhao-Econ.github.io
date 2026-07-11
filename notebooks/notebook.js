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

