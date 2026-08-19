const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const listeners = {};
const values = {
  title: 'Public record test',
  statement: 'A clear record improves reviewability.',
  category: 'Evidence',
  status: 'Sources cited',
  sources: 'https://example.org/source-one\nTest artifact 02',
  boundary: 'This record does not establish causation.',
  owner: 'Arctura',
  reviewDate: '2026-09-01',
};

const form = {
  addEventListener: (type, handler) => { listeners[type] = handler; },
  reportValidity: () => { throw new Error('Expected valid test data.'); },
  reset: () => {},
};
const output = { textContent: '' };
const downloadButton = { disabled: true, addEventListener: () => {}, focus: () => {} };
const resetButton = { addEventListener: () => {} };

global.document = {
  querySelector(selector) {
    return {
      '[data-claim-form]': form,
      '[data-claim-output]': output,
      '[data-download-claim]': downloadButton,
      '[data-reset-claim]': resetButton,
    }[selector] || null;
  },
  getElementById: () => null,
  body: { append: () => {} },
  createElement: () => ({ click: () => {}, remove: () => {} }),
};
global.FormData = class FormData {
  get(name) { return values[name] || ''; }
};

global.URL = { createObjectURL: () => 'blob:test', revokeObjectURL: () => {} };
global.Blob = class Blob {};

vm.runInThisContext(fs.readFileSync('tools/claim-record.js', 'utf8'), { filename: 'tools/claim-record.js' });
listeners.submit({ preventDefault: () => {} });

assert.match(output.textContent, /^# Public record test/m);
assert.match(output.textContent, /\| Category \| Evidence \|/);
assert.match(output.textContent, /\| Evidence status \| Sources cited \|/);
assert.match(output.textContent, /- https:\/\/example.org\/source-one/);
assert.match(output.textContent, /This record does not establish causation\./);
assert.match(output.textContent, /September 1, 2026/);
assert.strictEqual(downloadButton.disabled, false);

console.log('Claim Record Builder behavior test passed.');
