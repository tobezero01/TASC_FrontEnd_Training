export class UI {
  constructor(manager) {
    this.m = manager;
    // cache DOM
    this.form = document.getElementById('bookForm');
    this.title = document.getElementById('title');
    this.author = document.getElementById('author');
    this.year = document.getElementById('year');
    this.isRead = document.getElementById('isRead');
    this.error = document.getElementById('error');
    this.q = document.getElementById('q');
    this.list = document.getElementById('list');
    this.clearAll = document.getElementById('clearAll');
    this.countTotal = document.getElementById('countTotal');
    this.countRead = document.getElementById('countRead');
    this.countUnread = document.getElementById('countUnread');
  }

  init() {
    // events
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = this._collect();
      if (!data.title || !data.author) {
        this._error('Vui lòng nhập tiêu đề và tác giả.');
        return;
      }
      this._clearError();
      this.m.add(data);
      this.form.reset();
      this.title.focus();
      this.render();
    });

    this.list.addEventListener('click', (e) => {
      const del = e.target.closest('.delete');
      if (del) {
        const id = Number(del.dataset.id);
        this.m.remove(id);
        this.render();
        return;
      }
      const toggle = e.target.closest('.toggle');
      if (toggle) {
        const id = Number(toggle.dataset.id);
        this.m.toggle(id);
        this.render();
      }
    });

    this.q.addEventListener('input', () => this.render());
    this.clearAll.addEventListener('click', () => { this.m.clear(); this.render(); });

    // first render
    this.render();
  }

  render() {
    const items = this.m.list(this.q.value);
    const html = items.map(b => `
      <li class="item">
        <div>
          <div class="title">${this._escape(b.title)}</div>
          <div class="meta">
            <span class="author">👤 ${this._escape(b.author)}</span>
            ${b.year ? ` · <span class="year">📅 ${b.year}</span>` : ''}
            · <span class="badge ${b.isRead ? 'read' : 'unread'}">${b.isRead ? 'Đã đọc' : 'Chưa đọc'}</span>
          </div>
        </div>
        <div class="actions">
          <button class="action toggle" data-id="${b.id}">${b.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}</button>
        </div>
        <button class="delete" title="Xoá" aria-label="Delete" data-id="${b.id}">🗑️</button>
      </li>
    `).join('');
    this.list.innerHTML = html;

    const { total, read, unread } = this.m.stats();
    this.countTotal.textContent = total;
    this.countRead.textContent = read;
    this.countUnread.textContent = unread;
  }

  _collect() {
    return {
      title: this.title.value.trim(),
      author: this.author.value.trim(),
      year: this.year.value ? Number(this.year.value) : null,
      isRead: this.isRead.checked
    };
  }

  _error(msg){ this.error.textContent = msg; this.error.hidden = false; }
  _clearError(){ this.error.textContent = ''; this.error.hidden = true; }

  _escape(s){ return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
}
