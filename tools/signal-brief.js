(() => {
  const form = document.querySelector('[data-brief-form]');
  const output = document.querySelector('[data-brief-output]');
  const downloadButton = document.querySelector('[data-download-brief]');
  const resetButton = document.querySelector('[data-reset-brief]');

  if (!form || !output || !downloadButton || !resetButton) return;

  let generatedBrief = '';
  let generatedTitle = 'arctura-signal-brief';

  const clean = (value) => String(value || '').trim();
  const markdownSafe = (value) => clean(value).replace(/\r\n/g, '\n');
  const listFromLines = (value, fallback) => {
    const lines = markdownSafe(value).split('\n').map((line) => line.trim()).filter(Boolean);
    return lines.length ? lines.map((line) => `- ${line}`).join('\n') : `- ${fallback}`;
  };
  const asDate = (value) => {
    if (!value) return 'Not scheduled';
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return value;
    return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
      .format(new Date(year, month - 1, day));
  };
  const slugify = (value) => clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 72) || 'arctura-signal-brief';
  const input = (name) => clean(new FormData(form).get(name));

  const buildBrief = () => {
    const title = input('title');
    const question = input('question');

    if (!title || !question) {
      form.reportValidity();
      return '';
    }

    const outcome = input('outcome') || 'Define a useful, reviewable next action.';
    const evidence = input('evidence');
    const boundary = input('boundary') || 'This brief structures the question. It does not make the decision or verify the underlying evidence.';
    const owner = input('owner') || 'Unassigned';
    const reviewDate = input('reviewDate');

    return `# ${markdownSafe(title)}\n\n## Decision question\n\n${markdownSafe(question)}\n\n## Useful outcome\n\n${markdownSafe(outcome)}\n\n## Evidence to gather\n\n${listFromLines(evidence, 'Identify primary sources, relevant data, and accountable stakeholders.')}\n\n## Boundary\n\n${markdownSafe(boundary)}\n\n## Accountability\n\n| Field | Record |\n| --- | --- |\n| Accountable owner | ${markdownSafe(owner)} |\n| Review date | ${asDate(reviewDate)} |\n| Generated with | Arctura Signal Brief Builder |\n\n## Next action\n\n- Confirm the scope, assign an owner, gather the listed evidence, and review this record by the stated date.\n`;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    generatedBrief = buildBrief();
    if (!generatedBrief) return;

    generatedTitle = slugify(input('title'));
    output.textContent = generatedBrief;
    downloadButton.disabled = false;
    downloadButton.focus();
  });

  downloadButton.addEventListener('click', () => {
    if (!generatedBrief) return;
    const blob = new Blob([generatedBrief], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedTitle}.md`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });

  resetButton.addEventListener('click', () => {
    form.reset();
    generatedBrief = '';
    generatedTitle = 'arctura-signal-brief';
    output.textContent = 'Complete the required fields and choose “Build brief” to create a portable Markdown record.';
    downloadButton.disabled = true;
    document.getElementById('brief-title')?.focus();
  });
})();
