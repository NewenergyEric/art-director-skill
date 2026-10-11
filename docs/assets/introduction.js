const status = document.getElementById('copy-status');
let noticeTimer;
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const source = document.getElementById(button.dataset.copy);
    try {
      await navigator.clipboard.writeText(source.textContent.trim());
      status.textContent = document.body.dataset.copySuccess;
    } catch {
      const range = document.createRange();
      range.selectNodeContents(source);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = document.body.dataset.copyFallback;
    }
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { status.textContent = ''; }, 5000);
  });
});
const film = document.getElementById('film-player');
let pendingSeek;
function seekToChapter() {
  if (pendingSeek === undefined) return;
  film.currentTime = pendingSeek;
  pendingSeek = undefined;
  film.focus();
}
film.addEventListener('loadedmetadata', seekToChapter);
document.querySelectorAll('[data-seek]').forEach(button => {
  button.addEventListener('click', () => {
    pendingSeek = Number(button.dataset.seek);
    film.pause();
    if (film.readyState >= 1) seekToChapter(); else film.load();
  });
});
document.addEventListener('visibilitychange', () => { if (document.hidden) film.pause(); });
document.querySelectorAll('.masthead [data-language-link]').forEach(link => {
  link.hash = window.location.hash;
});
window.addEventListener('hashchange', () => {
  document.querySelectorAll('.masthead [data-language-link]').forEach(link => { link.hash = window.location.hash; });
});
