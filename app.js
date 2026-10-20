/* Static GitHub Pages demo. Browser storage is local to one browser and is not a shared database. */
const seedEvents = [
  { id: "1", title: "Технологии будущего", description: "Встреча для тех, кто интересуется новыми идеями, цифровыми продуктами и технологиями.", date: "2026-11-14", location: "Алматы", capacity: 120 },
  { id: "2", title: "Дизайн и город", description: "Обсуждаем, как дизайн делает городскую среду удобнее и интереснее.", date: "2026-11-28", location: "Астана", capacity: 80 },
  { id: "3", title: "Молодёжный хакатон", description: "Командная работа над прототипами полезных цифровых проектов.", date: "2026-12-05", location: "Онлайн", capacity: 60 }
];
const readEvents = () => {
  try { return JSON.parse(localStorage.getItem("evently-demo-events")) || seedEvents; }
  catch { return seedEvents; }
};
const saveEvents = (events) => localStorage.setItem("evently-demo-events", JSON.stringify(events));
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const formatDate = (value) => {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(date);
};
const root = document.getElementById("app");
const header = (admin = false) => `<header class="site-header"><a class="brand" href="#/">Evently<span>.</span></a><nav><a href="#/">Мероприятия</a><a href="#/admin">Администратор</a></nav></header>`;
const footer = () => `<footer>© 2026 Evently <span>События, которые объединяют</span><span class="author-mark">Eo_ok</span></footer>`;
const shell = (content, options = {}) => { document.body.className = options.registration ? "registration-shell" : options.admin ? "admin-shell" : ""; root.innerHTML = `${header(options.admin)}${content}${footer()}`; };
function renderHome() {
  const events = readEvents();
  const cards = events.length ? `<div class="event-grid">${events.map((event) => `<article class="event-card"><div class="card-top"><span class="tag">${escapeHtml(event.location)}</span><span class="availability">${event.capacity} мест</span></div><p class="date">${escapeHtml(formatDate(event.date))}</p><h3>${escapeHtml(event.title)}</h3><p class="description">${escapeHtml(event.description)}</p><div class="card-bottom"><span>Регистрация открыта</span><a class="button button-small" href="#/event/${encodeURIComponent(event.id)}">Подробнее <span aria-hidden="true">→</span></a></div></article>`).join("")}</div>` : `<div class="empty-state"><h3>Пока нет мероприятий</h3><p>Загляните позже — новые события скоро появятся.</p></div>`;
  shell(`<main class="page"><section class="hero"><p class="eyebrow">Встречайтесь. Учитесь. Создавайте.</p><h1>Найдите своё<br><span>следующее событие.</span></h1><p class="hero-copy">Конференции, встречи и хакатоны — выберите событие и зарегистрируйтесь за минуту.</p></section><section class="section-head"><div><p class="eyebrow">Календарь</p><h2>Предстоящие мероприятия</h2></div><span class="count">${events.length} события</span></section>${cards}</main>`);
}
function renderEvent(id) {
  const event = readEvents().find((item) => String(item.id) === String(id));
  if (!event) return renderNotFound();
  shell(`<main class="page narrow"><a class="text-link" href="#/">← Все мероприятия</a><article class="detail-card"><p class="eyebrow">${escapeHtml(formatDate(event.date))} · ${escapeHtml(event.location)}</p><h1>${escapeHtml(event.title)}</h1><p class="detail-copy">${escapeHtml(event.description)}</p><div class="stats"><div><strong>—</strong><span>зарегистрировано</span></div><div><strong>${event.capacity}</strong><span>всего мест</span></div><div><strong>Открыта</strong><span>регистрация</span></div></div><a class="button" href="#/register/${encodeURIComponent(event.id)}">Зарегистрироваться <span aria-hidden="true">→</span></a><p class="privacy-note">Демонстрационная версия: форма не отправляет и не сохраняет персональные данные.</p></article></main>`);
}
function renderRegister(id) {
  const event = readEvents().find((item) => String(item.id) === String(id));
  if (!event) return renderNotFound();
  shell(`<main class="page registration-page"><a class="text-link registration-back" href="#/event/${encodeURIComponent(event.id)}">← Вернуться к мероприятию</a><section class="registration-card"><div class="registration-topline"><span class="registration-mark">Регистрация участника</span><span class="registration-seat">Мероприятие: <strong>${escapeHtml(event.location)}</strong></span></div><div class="registration-heading"><p class="eyebrow">${escapeHtml(formatDate(event.date))} · ${escapeHtml(event.location)}</p><h1>Регистрация на мероприятие</h1><p class="registration-event-title">${escapeHtml(event.title)}</p><p class="registration-description">Заполните демонстрационную форму. Данные не будут отправлены.</p></div><form id="registration-form" class="registration-form"><div class="registration-field"><label for="name">Имя и фамилия</label><input id="name" name="name" type="text" placeholder="Например, Анна Иванова" minlength="2" maxlength="120" autocomplete="name" required></div><div class="registration-field"><label for="email">Электронная почта</label><input id="email" name="email" type="email" placeholder="name@example.com" maxlength="254" autocomplete="email" required></div><div class="registration-field registration-field-wide"><label for="phone">Номер телефона</label><input id="phone" name="phone" type="tel" placeholder="+7 700 000 0000" minlength="7" maxlength="30" autocomplete="tel" required></div><div class="registration-submit"><p>Демонстрационная форма<br><span>Отправка данных пока не подключена.</span></p><button class="button registration-button" type="submit">Проверить форму <span aria-hidden="true">→</span></button></div></form><div id="form-message" class="form-message" role="status" hidden>Форма заполнена. Для настоящей регистрации нужен сервер или сервис приёма заявок.</div></section></main>`, { registration: true });
  document.getElementById("registration-form").addEventListener("submit", (event) => { event.preventDefault(); document.getElementById("form-message").hidden = false; });
}
function renderAdmin() {
  const events = readEvents();
  shell(`<main class="page admin-page"><section class="section-head"><div><p class="eyebrow">Демонстрационный режим</p><h1>Управление событиями</h1></div><span class="count">${events.length} мероприятий</span></section><div class="demo-notice">Это статический сайт. Новое событие сохранится только в текущем браузере и не появится у других посетителей.</div><section class="admin-form-card"><div class="admin-section-title"><div><p class="eyebrow">Новое событие</p><h2>Добавить мероприятие</h2><p class="admin-form-intro">Заполните поля, чтобы добавить карточку в этом браузере.</p></div><span class="admin-step" aria-hidden="true">＋</span></div><form id="event-form" class="event-form"><label>Название мероприятия<input name="title" type="text" maxlength="160" placeholder="Например, Летняя конференция" required minlength="2"></label><label>Место проведения<input name="location" type="text" maxlength="200" placeholder="Город или онлайн" required minlength="2"></label><label>Дата проведения<input name="date" type="date" required></label><label>Количество мест<input name="capacity" type="number" min="1" max="100000" placeholder="Например, 100" required></label><label class="field-wide">Описание<textarea name="description" rows="4" maxlength="2000" placeholder="Расскажите о мероприятии" required minlength="5"></textarea></label><div class="field-wide form-submit-row"><p><span class="required-mark">*</span> Обязательные поля</p><button class="button" type="submit">Добавить в демо <span aria-hidden="true">→</span></button></div></form></section><section class="admin-list-section"><div class="section-head"><div><p class="eyebrow">Список</p><h2>Мероприятия</h2></div></div><div id="admin-events"></div></section></main>`, { admin: true });
  const refreshTable = () => {
    const current = readEvents();
    document.getElementById("admin-events").innerHTML = current.length ? `<div class="table-card"><div class="table-scroll"><table class="events-table"><thead><tr><th>Мероприятие</th><th>Дата</th><th>Место проведения</th><th>Вместимость</th></tr></thead><tbody>${current.map((event) => `<tr><td class="person">${escapeHtml(event.title)}</td><td>${escapeHtml(formatDate(event.date))}</td><td>${escapeHtml(event.location)}</td><td><span class="tag">${event.capacity} мест</span></td></tr>`).join("")}</tbody></table></div></div>` : `<div class="empty-state"><h3>Пока нет мероприятий</h3></div>`;
  };
  refreshTable();
  document.getElementById("event-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updated = readEvents();
    updated.unshift({ id: `local-${Date.now()}`, title: data.get("title").trim(), location: data.get("location").trim(), date: data.get("date"), capacity: Number(data.get("capacity")), description: data.get("description").trim() });
    saveEvents(updated);
    event.currentTarget.reset();
    refreshTable();
    document.querySelector(".demo-notice").textContent = "Событие добавлено в локальный список этого браузера.";
  });
}
function renderNotFound() { shell(`<main class="page narrow"><section class="success-card"><p class="eyebrow">Страница не найдена</p><h1>Такого мероприятия нет</h1><a class="button" href="#/">Вернуться к мероприятиям</a></section></main>`); }
function render() {
  const route = decodeURIComponent(location.hash.slice(1) || "/");
  if (route === "/" || route === "") return renderHome();
  if (route === "/admin") return renderAdmin();
  const eventMatch = route.match(/^\/event\/([^/]+)$/);
  if (eventMatch) return renderEvent(eventMatch[1]);
  const registerMatch = route.match(/^\/register\/([^/]+)$/);
  if (registerMatch) return renderRegister(registerMatch[1]);
  renderNotFound();
}
window.addEventListener("hashchange", render);
render();
