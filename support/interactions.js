/* Extracted interaction module for /support/index.html. */

document.addEventListener('DOMContentLoaded', function () {
  // T1 — Primary Council Safe (cyan/gold)
  new QRCode(document.getElementById('qr1'), {
    text: 'ethereum:0xb60a1dc7E453e8cB9a2859290D7f9ad4c3181664@8453',
    width: 148, height: 148,
    colorDark: '#C8A96E',
    colorLight: '#0a0f1c',
    correctLevel: QRCode.CorrectLevel.M
  });

  // T2 — Overflow Channel (blue)
  new QRCode(document.getElementById('qr2'), {
    text: 'ethereum:0x3cBA7f0ad575331B892F001aef4D204b263Fdd58@8453',
    width: 148, height: 148,
    colorDark: '#7EAADC',
    colorLight: '#0a0f1c',
    correctLevel: QRCode.CorrectLevel.M
  });
});

function copy(addr, btn) {
  navigator.clipboard.writeText(addr).then(function () {
    btn.textContent = '✓ Copied';
    btn.classList.add('ok');
    setTimeout(function () {
      btn.textContent = '⬡ Copy Address';
      btn.classList.remove('ok');
    }, 2400);
  }).catch(function () {
    btn.textContent = addr.slice(0, 12) + '…';
    setTimeout(function () { btn.textContent = '⬡ Copy Address'; }, 3000);
  });
}
