(() => {
  const form = document.querySelector('[data-claim-form]');
  const output = document.querySelector('[data-claim-output]');
  const downloadButton = document.querySelector('[data-download-claim]');
  const resetButton = document.querySelector('[data-reset-claim]');

  if (!form || !output || !downloadButton || !resetButton) return;

  let generatedRecord = '';
  let generatedTitle = 'arctura-claim-record';

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
    .slice(0, 72) || 'arctura-claim-record';
  const input = (name) => clean(new FormData(form).get(name));

  const buildRecord = () => {
    const title = input('title');
    const statement = input('statement');

    if (!title || !statement) {
      form.reportValidity();
      return '';
    }

    const category = input('category') || 'General';
    const status = input('status') || 'Unverified';
    const sources = input('sources');
    const boundary = input('boundary') || 'This record captures a stated claim and its cited sources. It does not independently verify accuracy, completeness, or fitness for a particular decision.';
    const owner = input('owner') || 'Unassigned';
    const reviewDate = input('reviewDate');

    return `# ${markdownSafe(title)}\n\n## Claim\n\n${markdownSafe(statement)}\n\n## Classification\n\n| Field | Record |\n| --- | --- |\n| Category | ${markdownSafe(category)} |\n| Evidence status | ${markdownSafe(status)} |\n| Record owner | ${markdownSafe(owner)} |\n| Review date | ${asDate(reviewDate)} |\n| Generated with | Arctura Claim Record Builder |\n\n## Cited sources\n\n${listFromLines(sources, 'No sources have been supplied.')}\n\n## Boundary\n\n${markdownSafe(boundary)}\n\n## Review prompt\n\n- Verify the cited sources, distinguish direct evidence from interpretation, update the evidence status, and revise this record by the stated review date.\n`;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    generatedRecord = buildRecord();
    if (!generatedRecord) return;

    generatedTitle = slugify(input('title'));
    output.textContent = generatedRecord;
    downloadButton.disabled = false;
    downloadButton.focus();
  });

  downloadButton.addEventListener('click', () => {
    if (!generatedRecord) return;
    const blob = new Blob([generatedRecord], { type: 'text/markdown;charset=utf-8' });
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
    generatedRecord = '';
    generatedTitle = 'arctura-claim-record';
    output.textContent = 'Complete the required fields and choose “Build record” to create a portable Markdown claim record.';
    downloadButton.disabled = true;
    document.getElementById('claim-title')?.focus();
  });
})();
