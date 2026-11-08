import { useEffect, useMemo, useState } from 'react';

const Icon = ({ name, size = 20 }) => {
  const paths = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z"/><path d="M8 7h8M8 11h6"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
    chart: '<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    flag: '<path d="M5 21V4M5 5h11l-2 4 2 4H5"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    logout: '<path d="M10 17l5-5-5-5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    spark: '<path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
    arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
    filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
    flame: '<path d="M12 22c4 0 7-3 7-7 0-3-1.5-5.5-4-8 .2 3-1 4-2 4-1.2 0-2-1-1.7-4C8 9 5 12 5 16c0 3.3 3 6 7 6Z"/>',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: paths[name] || paths.grid }} />;
};

const subjectsSeed = [
  { id: 'web', name: 'Lập trình Web', code: 'INT3306', lecturer: 'ThS. Nguyễn Minh Anh', room: 'P. 305 • Thứ 2, 07:30', color: '#6366f1', note: 'React, Node.js và MongoDB' },
  { id: 'db', name: 'Cơ sở dữ liệu', code: 'INT2207', lecturer: 'TS. Trần Đức Long', room: 'P. 201 • Thứ 4, 09:30', color: '#f59e0b', note: 'Thiết kế và tối ưu cơ sở dữ liệu' },
  { id: 'ui', name: 'Thiết kế UI/UX', code: 'INT3120', lecturer: 'ThS. Lê Hoài Thu', room: 'Lab 2 • Thứ 5, 13:30', color: '#ec4899', note: 'Nghiên cứu người dùng và prototype' },
  { id: 'algo', name: 'Cấu trúc dữ liệu', code: 'INT2210', lecturer: 'TS. Phạm Quang Huy', room: 'P. 404 • Thứ 6, 07:30', color: '#10b981', note: 'Thuật toán và giải bài tập' },
];

const deadlinesSeed = [
  { id: 1, title: 'Hoàn thiện giao diện UniPlan', subject: 'web', type: 'Project', due: '2026-11-07T23:59', priority: 'Cao', status: 'Đang làm', progress: 72, hours: 5, reminder: 1, description: 'Hoàn thiện responsive, kiểm tra form và chuẩn bị source code.', checklist: [{ text: 'Thiết kế dashboard', done: true }, { text: 'Dựng trang lịch', done: true }, { text: 'Kiểm thử responsive', done: false }, { text: 'Hoàn thiện slide báo cáo', done: false }] },
  { id: 2, title: 'Bài tập chuẩn hóa dữ liệu', subject: 'db', type: 'Bài tập', due: '2026-11-09T20:00', priority: 'Trung bình', status: 'Chưa làm', progress: 15, hours: 3, reminder: 3, description: 'Chuẩn hóa lược đồ đến 3NF và giải thích phụ thuộc hàm.', checklist: [{ text: 'Xác định khóa', done: true }, { text: 'Chuẩn hóa 1NF → 3NF', done: false }] },
  { id: 3, title: 'Nộp prototype ứng dụng', subject: 'ui', type: 'Thuyết trình', due: '2026-11-12T17:00', priority: 'Cao', status: 'Đang làm', progress: 48, hours: 6, reminder: 3, description: 'Prototype tương tác và bản ghi chú usability test.', checklist: [{ text: 'User flow', done: true }, { text: 'Wireframe', done: true }, { text: 'Prototype', done: false }, { text: 'Usability test', done: false }] },
  { id: 4, title: 'Ôn tập cây AVL và Heap', subject: 'algo', type: 'Kiểm tra', due: '2026-11-14T07:30', priority: 'Trung bình', status: 'Chưa làm', progress: 20, hours: 4, reminder: 7, description: 'Ôn lý thuyết và làm bộ 20 câu trắc nghiệm.', checklist: [{ text: 'Cây AVL', done: true }, { text: 'Heap', done: false }, { text: 'Bài tập tổng hợp', done: false }] },
  { id: 5, title: 'ERD hệ thống thư viện', subject: 'db', type: 'Bài tập', due: '2026-11-04T23:59', priority: 'Cao', status: 'Quá hạn', progress: 60, hours: 2, reminder: 1, description: 'Vẽ ERD và ánh xạ sang mô hình quan hệ.', checklist: [{ text: 'Phân tích thực thể', done: true }, { text: 'Vẽ ERD', done: true }, { text: 'Ánh xạ mô hình', done: false }] },
  { id: 6, title: 'Nghiên cứu người dùng', subject: 'ui', type: 'Bài tập', due: '2026-11-02T18:00', priority: 'Thấp', status: 'Hoàn thành', progress: 100, hours: 4, reminder: 3, description: 'Phỏng vấn 5 sinh viên và tổng hợp insight.', checklist: [{ text: 'Soạn câu hỏi', done: true }, { text: 'Phỏng vấn', done: true }, { text: 'Tổng hợp insight', done: true }] },
  { id: 7, title: 'Lab REST API', subject: 'web', type: 'Bài tập', due: '2026-11-18T23:59', priority: 'Trung bình', status: 'Chưa làm', progress: 0, hours: 5, reminder: 3, description: 'Xây dựng API CRUD đơn giản bằng Express.', checklist: [{ text: 'Routes', done: false }, { text: 'Controllers', done: false }, { text: 'Postman test', done: false }] },
];

const pages = [
  { id: 'dashboard', label: 'Tổng quan', icon: 'grid' },
  { id: 'calendar', label: 'Lịch học tập', icon: 'calendar' },
  { id: 'deadlines', label: 'Deadline', icon: 'check', badge: 4 },
  { id: 'subjects', label: 'Môn học', icon: 'book' },
  { id: 'semesters', label: 'Học kỳ', icon: 'layers' },
  { id: 'statistics', label: 'Thống kê', icon: 'chart' },
];

const formatDate = (iso, withTime = true) => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}) }).format(date);
};

const urgency = (item) => {
  const weight = { Cao: 3, 'Trung bình': 2, Thấp: 1 }[item.priority] || 1;
  const hoursLeft = (new Date(item.due) - new Date('2026-11-06T12:00')) / 36e5;
  const timeScore = hoursLeft <= 0 ? 10 : hoursLeft < 24 ? 8 : hoursLeft < 72 ? 5 : 2;
  return Math.round(weight * 3 + timeScore * 2 + (100 - item.progress) / 20);
};

function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('uniplan-auth') !== 'false');
  const [authMode, setAuthMode] = useState('login');
  const [theme, setTheme] = useState(() => localStorage.getItem('uniplan-theme') || 'light');
  const [page, setPage] = useState(() => location.hash.replace('#/', '') || 'dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deadlines, setDeadlines] = useState(() => JSON.parse(localStorage.getItem('uniplan-deadlines') || 'null') || deadlinesSeed);
  const [subjects] = useState(subjectsSeed);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('uniplan-theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('uniplan-deadlines', JSON.stringify(deadlines)); }, [deadlines]);
  useEffect(() => { location.hash = `/${page}`; setMobileOpen(false); window.scrollTo(0, 0); }, [page]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timer); }, [toast]);

  const subjectById = (id) => subjects.find((subject) => subject.id === id) || subjects[0];
  const updateDeadline = (id, values) => setDeadlines((all) => all.map((item) => item.id === id ? { ...item, ...values } : item));
  const addDeadline = (item) => { setDeadlines((all) => [{ ...item, id: Date.now(), checklist: [] }, ...all]); setModal(null); setToast('Đã thêm deadline mới'); };
  const removeDeadline = (id) => { if (window.confirm('Xóa deadline này? Thao tác không thể hoàn tác.')) { setDeadlines((all) => all.filter((item) => item.id !== id)); setSelected(null); setToast('Đã xóa deadline'); } };

  if (!authed) return <AuthScreen mode={authMode} setMode={setAuthMode} onAuth={() => { localStorage.setItem('uniplan-auth', 'true'); setAuthed(true); }} />;

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} open={mobileOpen} close={() => setMobileOpen(false)} onLogout={() => { localStorage.setItem('uniplan-auth', 'false'); setAuthed(false); }} />
      <main className="main-content">
        <Header page={page} onMenu={() => setMobileOpen(true)} theme={theme} setTheme={setTheme} onAdd={() => setModal('deadline')} notificationsOpen={notificationsOpen} setNotificationsOpen={setNotificationsOpen} />
        <div className="page-wrap">
          {page === 'dashboard' && <Dashboard deadlines={deadlines} subjects={subjects} subjectById={subjectById} setPage={setPage} openItem={setSelected} updateDeadline={updateDeadline} />}
          {page === 'calendar' && <CalendarPage deadlines={deadlines} subjectById={subjectById} openItem={setSelected} />}
          {page === 'deadlines' && <DeadlinesPage deadlines={deadlines} subjects={subjects} subjectById={subjectById} openItem={setSelected} updateDeadline={updateDeadline} add={() => setModal('deadline')} />}
          {page === 'subjects' && <SubjectsPage subjects={subjects} deadlines={deadlines} />}
          {page === 'semesters' && <SemestersPage deadlines={deadlines} />}
          {page === 'statistics' && <StatisticsPage deadlines={deadlines} subjects={subjects} />}
          {page === 'profile' && <ProfilePage theme={theme} setTheme={setTheme} deadlines={deadlines} />}
        </div>
      </main>
      <button className="mobile-fab" onClick={() => setModal('deadline')} aria-label="Thêm deadline"><Icon name="plus" /></button>
      {modal === 'deadline' && <DeadlineModal subjects={subjects} onClose={() => setModal(null)} onSave={addDeadline} />}
      {selected && <DeadlineDrawer item={deadlines.find((d) => d.id === selected.id) || selected} subject={subjectById(selected.subject)} onClose={() => setSelected(null)} update={updateDeadline} remove={removeDeadline} duplicate={(item) => { setDeadlines((all) => [{ ...item, id: Date.now(), title: `${item.title} (bản sao)` }, ...all]); setToast('Đã nhân bản deadline'); }} />}
      {toast && <div className="toast"><span><Icon name="check" size={17} /></span>{toast}</div>}
      {mobileOpen && <div className="scrim" onClick={() => setMobileOpen(false)} />}
    </div>
  );
}

function Sidebar({ page, setPage, open, close, onLogout }) {
  return <aside className={`sidebar ${open ? 'open' : ''}`}>
    <div className="brand"><div className="brand-mark"><Icon name="calendar" size={23} /></div><div><strong>UniPlan</strong><span>Student planner</span></div><button className="icon-btn side-close" onClick={close}><Icon name="x" /></button></div>
    <nav className="side-nav">
      <span className="nav-label">Không gian học tập</span>
      {pages.map((item) => <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => setPage(item.id)}><Icon name={item.icon} /><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</button>)}
    </nav>
    <div className="semester-mini"><div className="semester-icon">HK</div><div><span>Học kỳ hiện tại</span><strong>Học kỳ 1 • 2026</strong><div className="mini-progress"><i /></div><small>Tuần 10/15</small></div></div>
    <div className="sidebar-bottom">
      <button className={page === 'profile' ? 'active' : ''} onClick={() => setPage('profile')}><Icon name="user" /><span>Hồ sơ & cài đặt</span></button>
      <button onClick={onLogout}><Icon name="logout" /><span>Đăng xuất</span></button>
    </div>
  </aside>;
}

function Header({ page, onMenu, theme, setTheme, onAdd, notificationsOpen, setNotificationsOpen }) {
  const title = [...pages, { id: 'profile', label: 'Hồ sơ & cài đặt' }].find((p) => p.id === page)?.label;
  return <header className="topbar">
    <div className="top-title"><button className="icon-btn menu-btn" onClick={onMenu}><Icon name="menu" /></button><div><small>UniPlan / {title}</small><h1>{title}</h1></div></div>
    <div className="top-actions">
      <div className="global-search"><Icon name="search" size={18} /><input placeholder="Tìm deadline, môn học..." /><kbd>⌘ K</kbd></div>
      <button className="icon-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Đổi giao diện"><Icon name={theme === 'light' ? 'moon' : 'sun'} /></button>
      <div className="notification-wrap"><button className="icon-btn notification-btn" onClick={() => setNotificationsOpen(!notificationsOpen)}><Icon name="bell" /><i /></button>{notificationsOpen && <Notifications />}</div>
      <button className="primary-btn top-add" onClick={onAdd}><Icon name="plus" size={18} />Thêm deadline</button>
      <button className="avatar-btn"><span>NM</span><div><strong>Nguyễn Minh</strong><small>Sinh viên</small></div></button>
    </div>
  </header>;
}

function Notifications() {
  return <div className="popover notifications"><div className="popover-head"><strong>Thông báo</strong><button>Đánh dấu đã đọc</button></div><div className="notice urgent"><span><Icon name="clock" /></span><div><strong>Deadline còn dưới 24 giờ</strong><p>Hoàn thiện giao diện UniPlan</p><small>10 phút trước</small></div></div><div className="notice"><span><Icon name="calendar" /></span><div><strong>Lịch học sắp tới</strong><p>Cấu trúc dữ liệu • 07:30 ngày mai</p><small>1 giờ trước</small></div></div><div className="notice"><span><Icon name="check" /></span><div><strong>Tiến độ học kỳ đạt 68%</strong><p>Bạn đang làm rất tốt. Tiếp tục nhé!</p><small>Hôm qua</small></div></div></div>;
}

function Dashboard({ deadlines, subjects, subjectById, setPage, openItem, updateDeadline }) {
  const active = deadlines.filter((d) => d.status !== 'Hoàn thành');
  const completed = deadlines.filter((d) => d.status === 'Hoàn thành').length;
  const overdue = deadlines.filter((d) => d.status === 'Quá hạn').length;
  const recommended = [...active].sort((a, b) => urgency(b) - urgency(a)).slice(0, 3);
  const upcoming = [...active].sort((a, b) => new Date(a.due) - new Date(b.due)).slice(0, 5);
  return <div className="dashboard-page">
    <section className="welcome-row"><div><span className="eyebrow">THỨ SÁU, 06 THÁNG 11</span><h2>Chào buổi tối, Minh <span>👋</span></h2><p>Hôm nay bạn có <strong>2 việc cần ưu tiên</strong>. Bắt đầu một chút, tiến gần mục tiêu một bước.</p></div><div className="streak"><span><Icon name="flame" /></span><div><strong>7 ngày</strong><small>Chuỗi học tập</small></div></div></section>
    <section className="stats-grid">
      <StatCard icon="calendar" tone="indigo" value="2" label="Deadline hôm nay" hint="1 việc cần ưu tiên" />
      <StatCard icon="clock" tone="amber" value="4" label="Trong 7 ngày tới" hint="+2 so với tuần trước" />
      <StatCard icon="check" tone="green" value={completed + 11} label="Đã hoàn thành" hint="86% đúng hạn" />
      <StatCard icon="flag" tone="rose" value={overdue} label="Đã quá hạn" hint="Cần xử lý sớm" />
    </section>
    <section className="dash-grid main-grid">
      <div className="panel priority-panel">
        <div className="panel-head"><div><span className="panel-kicker"><Icon name="spark" size={16} /> GỢI Ý THÔNG MINH</span><h3>Bạn nên làm gì tiếp theo?</h3></div><button className="text-btn" onClick={() => setPage('deadlines')}>Xem tất cả <Icon name="arrow" size={16} /></button></div>
        <div className="priority-list">{recommended.map((item, index) => { const subject = subjectById(item.subject); return <button className="priority-item" key={item.id} onClick={() => openItem(item)}><span className={`rank rank-${index + 1}`}>{index + 1}</span><span className="subject-dot" style={{ background: subject.color }} /><div className="priority-info"><strong>{item.title}</strong><span>{subject.name} • {item.hours} giờ dự kiến</span><div className="progress-line"><i style={{ width: `${item.progress}%`, background: subject.color }} /></div></div><div className="deadline-time"><b>{urgency(item)} điểm</b><span>{formatDate(item.due)}</span></div><Icon name="chevron" size={18} /></button>; })}</div>
      </div>
      <div className="panel semester-progress">
        <div className="panel-head"><div><span className="panel-kicker">HỌC KỲ 1 • 2026</span><h3>Tiến độ học kỳ</h3></div><button className="icon-btn"><Icon name="more" /></button></div>
        <div className="donut-wrap"><div className="donut" style={{ '--value': '68%' }}><div><strong>68%</strong><span>hoàn thành</span></div></div><div className="donut-copy"><strong>Tuần 10 / 15</strong><p>28/08 — 18/12/2026</p><div><span><i className="dot green" />12 hoàn thành</span><span><i className="dot gray" />6 còn lại</span></div></div></div>
        <div className="semester-note"><span>🎯</span><p>Bạn đang đi đúng tiến độ! Hoàn thành thêm <strong>2 deadline</strong> để đạt mục tiêu tuần.</p></div>
      </div>
    </section>
    <section className="dash-grid lower-grid">
      <div className="panel upcoming-panel"><div className="panel-head"><div><span className="panel-kicker">SẮP TỚI</span><h3>Deadline gần nhất</h3></div><button className="text-btn" onClick={() => setPage('calendar')}>Mở lịch <Icon name="calendar" size={16} /></button></div><div className="upcoming-list">{upcoming.map((item) => { const subject = subjectById(item.subject); return <div className="upcoming-item" key={item.id} onClick={() => openItem(item)}><button className={`round-check ${item.status === 'Hoàn thành' ? 'done' : ''}`} onClick={(e) => { e.stopPropagation(); updateDeadline(item.id, { status: 'Hoàn thành', progress: 100 }); }}><Icon name="check" size={14} /></button><span className="date-tile"><b>{new Date(item.due).getDate()}</b><small>TH{new Date(item.due).getMonth() + 1}</small></span><div><strong>{item.title}</strong><span><i style={{ background: subject.color }} />{subject.name}</span></div><span className={`priority-badge ${item.priority.toLowerCase().replace(' ', '-')}`}>{item.priority}</span><time>{formatDate(item.due).split(' ')[1] || '23:59'}</time></div>; })}</div></div>
      <div className="panel subject-chart"><div className="panel-head"><div><span className="panel-kicker">PHÂN BỔ</span><h3>Deadline theo môn</h3></div><button className="text-btn" onClick={() => setPage('statistics')}>Chi tiết</button></div><div className="bar-chart">{subjects.map((subject) => { const count = deadlines.filter((d) => d.subject === subject.id).length; return <div className="bar-row" key={subject.id}><span>{subject.code}</span><div><i style={{ width: `${count * 29}%`, background: subject.color }} /></div><b>{count}</b></div>; })}</div><div className="chart-caption">Tổng cộng <strong>{deadlines.length} deadline</strong> trong học kỳ này</div></div>
    </section>
  </div>;
}

function StatCard({ icon, tone, value, label, hint }) { return <div className="stat-card"><span className={`stat-icon ${tone}`}><Icon name={icon} /></span><div><strong>{value}</strong><span>{label}</span><small>{hint}</small></div><Icon name="chevron" size={18} /></div>; }

function DeadlinesPage({ deadlines, subjects, subjectById, openItem, updateDeadline, add }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Tất cả');
  const [subject, setSubject] = useState('all');
  const [sort, setSort] = useState('due');
  const filtered = useMemo(() => deadlines.filter((d) => d.title.toLowerCase().includes(search.toLowerCase()) && (status === 'Tất cả' || d.status === status) && (subject === 'all' || d.subject === subject)).sort((a, b) => sort === 'priority' ? urgency(b) - urgency(a) : sort === 'progress' ? b.progress - a.progress : new Date(a.due) - new Date(b.due)), [deadlines, search, status, subject, sort]);
  return <div className="content-page">
    <div className="page-heading"><div><span className="eyebrow">QUẢN LÝ CÔNG VIỆC</span><h2>Tất cả deadline</h2><p>Theo dõi và hoàn thành các công việc đúng hạn.</p></div><button className="primary-btn" onClick={add}><Icon name="plus" size={18} />Thêm deadline</button></div>
    <div className="quick-filters"><button className={status === 'Tất cả' ? 'active' : ''} onClick={() => setStatus('Tất cả')}>Tất cả <b>{deadlines.length}</b></button><button onClick={() => setStatus('Chưa làm')}>Chưa hoàn thành</button><button onClick={() => setStatus('Quá hạn')}>Đã quá hạn</button><button onClick={() => { setStatus('Tất cả'); setSort('priority'); }}>Ưu tiên cao</button></div>
    <div className="filterbar"><label className="search-field"><Icon name="search" size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo tiêu đề..." /></label><select value={subject} onChange={(e) => setSubject(e.target.value)}><option value="all">Tất cả môn học</option>{subjects.map((s) => <option value={s.id} key={s.id}>{s.name}</option>)}</select><select value={status} onChange={(e) => setStatus(e.target.value)}><option>Tất cả</option><option>Chưa làm</option><option>Đang làm</option><option>Hoàn thành</option><option>Quá hạn</option></select><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="due">Hạn gần nhất</option><option value="priority">Mức ưu tiên</option><option value="progress">Tiến độ</option></select><button className="icon-btn"><Icon name="filter" /></button></div>
    <div className="deadline-table panel"><div className="table-head"><span>Công việc</span><span>Môn học</span><span>Hạn nộp</span><span>Ưu tiên</span><span>Tiến độ</span><span /></div>{filtered.map((item) => { const s = subjectById(item.subject); return <div className="table-row" key={item.id} onClick={() => openItem(item)}><span className="task-cell"><button className={`round-check ${item.status === 'Hoàn thành' ? 'done' : ''}`} onClick={(e) => { e.stopPropagation(); updateDeadline(item.id, item.status === 'Hoàn thành' ? { status: 'Đang làm', progress: 80 } : { status: 'Hoàn thành', progress: 100 }); }}><Icon name="check" size={14} /></button><span><strong>{item.title}</strong><small>{item.type}</small></span></span><span className="subject-pill"><i style={{ background: s.color }} />{s.code}</span><span className={item.status === 'Quá hạn' ? 'overdue-text' : ''}><strong>{formatDate(item.due, false)}</strong><small>{new Date(item.due).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</small></span><span><b className={`priority-badge ${item.priority.toLowerCase().replace(' ', '-')}`}>{item.priority}</b></span><span className="progress-cell"><strong>{item.progress}%</strong><i><b style={{ width: `${item.progress}%`, background: s.color }} /></i></span><button className="icon-btn"><Icon name="more" /></button></div>; })}{filtered.length === 0 && <div className="empty-state"><span>🔎</span><h3>Không tìm thấy deadline</h3><p>Hãy thử xóa bớt bộ lọc hoặc tạo công việc mới.</p></div>}</div>
  </div>;
}

function CalendarPage({ deadlines, subjectById, openItem }) {
  const [view, setView] = useState('Tháng');
  const days = Array.from({ length: 42 }, (_, i) => i - 1);
  return <div className="content-page"><div className="page-heading"><div><span className="eyebrow">THỜI GIAN BIỂU</span><h2>Lịch học tập</h2><p>Xem lịch học, lịch thi và deadline trên cùng một nơi.</p></div><div className="segmented">{['Tháng', 'Tuần', 'Danh sách'].map((v) => <button className={view === v ? 'active' : ''} onClick={() => setView(v)} key={v}>{v}</button>)}</div></div>
    {view === 'Tháng' ? <div className="calendar-panel panel"><div className="calendar-toolbar"><button className="icon-btn">‹</button><h3>Tháng 11, 2026 <span>Hôm nay</span></h3><button className="icon-btn">›</button></div><div className="weekdays">{['T2','T3','T4','T5','T6','T7','CN'].map((d) => <span key={d}>{d}</span>)}</div><div className="month-grid">{days.map((day, index) => { const isCurrent = day > 0 && day <= 30; const display = day <= 0 ? 31 + day : day > 30 ? day - 30 : day; const events = isCurrent ? deadlines.filter((d) => new Date(d.due).getDate() === day) : []; return <div className={`calendar-day ${!isCurrent ? 'muted' : ''} ${day === 6 ? 'today' : ''}`} key={index}><b>{display}</b>{events.slice(0, 3).map((event) => { const s = subjectById(event.subject); return <button style={{ '--event': s.color }} onClick={() => openItem(event)} key={event.id}>{event.title}</button>; })}</div>; })}</div></div> : <AgendaView deadlines={deadlines} subjectById={subjectById} openItem={openItem} week={view === 'Tuần'} />}
  </div>;
}

function AgendaView({ deadlines, subjectById, openItem, week }) { const sorted = [...deadlines].sort((a,b) => new Date(a.due)-new Date(b.due)); return <div className={`panel agenda ${week ? 'week-agenda' : ''}`}>{week && <div className="week-strip">{['T2\n02','T3\n03','T4\n04','T5\n05','T6\n06','T7\n07','CN\n08'].map((d) => <button className={d.includes('06') ? 'active' : ''} key={d}>{d.split('\n').map(x => <span key={x}>{x}</span>)}</button>)}</div>}<div className="agenda-list">{sorted.map((item) => { const s=subjectById(item.subject); return <button key={item.id} onClick={() => openItem(item)}><time><b>{new Date(item.due).getDate()}</b><span>Tháng 11</span></time><i style={{background:s.color}}/><div><strong>{item.title}</strong><span>{s.name} • {item.type}</span></div><em>{new Date(item.due).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}</em><Icon name="chevron" size={18}/></button>})}</div></div>; }

function SubjectsPage({ subjects, deadlines }) { return <div className="content-page"><div className="page-heading"><div><span className="eyebrow">HỌC KỲ 1 • 2026</span><h2>Môn học của tôi</h2><p>{subjects.length} môn học đang hoạt động trong học kỳ này.</p></div><button className="primary-btn"><Icon name="plus" size={18}/>Thêm môn học</button></div><div className="subject-grid">{subjects.map((s) => { const items=deadlines.filter(d=>d.subject===s.id); const avg=items.length?Math.round(items.reduce((n,d)=>n+d.progress,0)/items.length):0; return <div className="subject-card panel" key={s.id} style={{'--subject':s.color}}><div className="subject-card-top"><span className="subject-code">{s.code}</span><button className="icon-btn"><Icon name="more"/></button></div><div className="subject-symbol">{s.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><h3>{s.name}</h3><p>{s.note}</p><div className="subject-meta"><span><Icon name="user" size={16}/>{s.lecturer}</span><span><Icon name="calendar" size={16}/>{s.room}</span></div><div className="subject-stats"><div><strong>{items.length}</strong><span>Deadline</span></div><div><strong>{avg}%</strong><span>Tiến độ</span></div><div><strong>{items.filter(d=>d.status==='Hoàn thành').length}</strong><span>Hoàn thành</span></div></div><button className="subject-link">Xem chi tiết môn học <Icon name="arrow" size={16}/></button></div>})}</div></div>; }

function SemestersPage({ deadlines }) { return <div className="content-page"><div className="page-heading"><div><span className="eyebrow">KẾ HOẠCH DÀI HẠN</span><h2>Quản lý học kỳ</h2><p>Sắp xếp môn học và deadline theo từng giai đoạn.</p></div><button className="primary-btn"><Icon name="plus" size={18}/>Tạo học kỳ</button></div><div className="semester-list"><div className="semester-card current panel"><div className="semester-banner"><span>ĐANG DIỄN RA</span><strong>Học kỳ 1</strong><p>Năm học 2026 — 2027</p></div><div className="semester-details"><div><span>Thời gian</span><strong>28/08 — 18/12/2026</strong></div><div><span>Môn học</span><strong>4 môn</strong></div><div><span>Deadline</span><strong>{deadlines.length} công việc</strong></div><div><span>Tiến độ</span><strong>68%</strong></div><div className="wide-progress"><i style={{width:'68%'}}/></div><button className="secondary-btn">Quản lý học kỳ <Icon name="arrow" size={16}/></button></div></div><div className="semester-card panel archived"><div className="semester-banner"><span>ĐÃ LƯU TRỮ</span><strong>Học kỳ 2</strong><p>Năm học 2025 — 2026</p></div><div className="semester-details"><div><span>Thời gian</span><strong>12/01 — 25/05/2026</strong></div><div><span>Môn học</span><strong>5 môn</strong></div><div><span>Deadline</span><strong>24 công việc</strong></div><div><span>Hoàn thành</span><strong>92%</strong></div><button className="secondary-btn">Xem lại dữ liệu</button></div></div></div></div>; }

function StatisticsPage({ deadlines, subjects }) { const done=deadlines.filter(d=>d.status==='Hoàn thành').length; return <div className="content-page"><div className="page-heading"><div><span className="eyebrow">INSIGHT HỌC TẬP</span><h2>Thống kê & tiến độ</h2><p>Hiểu thói quen và cải thiện hiệu suất học tập của bạn.</p></div><select className="period-select"><option>30 ngày gần nhất</option><option>Học kỳ này</option></select></div><div className="insight-grid"><div className="panel insight-hero"><span className="panel-kicker">TỶ LỆ HOÀN THÀNH</span><div className="big-number">86<small>%</small></div><p>Tăng <strong>12%</strong> so với tháng trước</p><div className="line-chart"><svg viewBox="0 0 500 120" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6366f1" stopOpacity=".28"/><stop offset="1" stopColor="#6366f1" stopOpacity="0"/></linearGradient></defs><path d="M0 100 C70 90,80 50,145 72 S220 85,275 42 S350 58,410 25 S470 33,500 10 L500 120 L0 120Z" fill="url(#fill)"/><path d="M0 100 C70 90,80 50,145 72 S220 85,275 42 S350 58,410 25 S470 33,500 10" fill="none" stroke="#6366f1" strokeWidth="4"/></svg><div><span>T1</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span></div></div></div><div className="panel habit-card"><span className="panel-kicker">THÓI QUEN TỐT</span><div className="habit-icon"><Icon name="flame" size={28}/></div><h3>7 ngày liên tiếp</h3><p>Bạn đã hoàn thành ít nhất một công việc mỗi ngày.</p><div className="heatmap">{Array.from({length:35},(_,i)=><i key={i} className={i>25||[2,5,9,12,18,22].includes(i)?'hot':i%3?'warm':''}/>)}</div></div></div><div className="stats-panels"><div className="panel"><div className="panel-head"><h3>Hiệu suất theo môn học</h3><button className="icon-btn"><Icon name="more"/></button></div><div className="subject-performance">{subjects.map((s,i)=><div key={s.id}><span><i style={{background:s.color}}/>{s.name}</span><div><i style={{width:`${[78,64,88,71][i]}%`,background:s.color}}/></div><b>{[78,64,88,71][i]}%</b></div>)}</div></div><div className="panel"><div className="panel-head"><h3>Tình trạng công việc</h3></div><div className="status-donut"><div className="donut multi"><span>{deadlines.length}<small>Tổng</small></span></div><div><p><i className="dot indigo"/>Đang làm <b>{deadlines.filter(d=>d.status==='Đang làm').length}</b></p><p><i className="dot green"/>Hoàn thành <b>{done}</b></p><p><i className="dot amber"/>Chưa làm <b>{deadlines.filter(d=>d.status==='Chưa làm').length}</b></p><p><i className="dot rose"/>Quá hạn <b>{deadlines.filter(d=>d.status==='Quá hạn').length}</b></p></div></div></div></div></div>; }

function ProfilePage({ theme, setTheme, deadlines }) { const exportJSON=()=>{ const blob=new Blob([JSON.stringify({deadlines,subjects:subjectsSeed},null,2)],{type:'application/json'}); const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='uniplan-backup.json';a.click();URL.revokeObjectURL(a.href);}; const exportCSV=()=>{ const body=['Tiêu đề,Môn học,Loại,Hạn nộp,Ưu tiên,Trạng thái,Tiến độ',...deadlines.map(d=>`"${d.title}",${d.subject},${d.type},${d.due},${d.priority},${d.status},${d.progress}%`)].join('\n'); const blob=new Blob(['\ufeff'+body],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='deadlines.csv';a.click();}; return <div className="content-page"><div className="page-heading"><div><span className="eyebrow">TÀI KHOẢN</span><h2>Hồ sơ & cài đặt</h2><p>Quản lý thông tin cá nhân và tùy chọn ứng dụng.</p></div></div><div className="settings-grid"><div className="panel profile-card"><div className="profile-avatar">NM<button><Icon name="edit" size={14}/></button></div><h3>Nguyễn Minh</h3><p>minh.nguyen@university.edu.vn</p><span>Sinh viên • K66 Công nghệ thông tin</span><button className="secondary-btn">Chỉnh sửa hồ sơ</button></div><div className="settings-stack"><div className="panel setting-section"><h3>Giao diện</h3><p>Chọn chế độ hiển thị phù hợp với bạn.</p><div className="theme-options"><button className={theme==='light'?'active':''} onClick={()=>setTheme('light')}><span className="theme-preview light-preview"/><strong><Icon name="sun" size={17}/>Sáng</strong></button><button className={theme==='dark'?'active':''} onClick={()=>setTheme('dark')}><span className="theme-preview dark-preview"/><strong><Icon name="moon" size={17}/>Tối</strong></button></div></div><div className="panel setting-section"><h3>Nhắc việc mặc định</h3><div className="setting-row"><div><strong>Thông báo trong ứng dụng</strong><span>Cảnh báo khi deadline sắp tới</span></div><label className="switch"><input type="checkbox" defaultChecked/><i/></label></div><div className="setting-row"><div><strong>Thời gian nhắc trước</strong><span>Áp dụng khi tạo deadline mới</span></div><select defaultValue="3"><option value="1">1 ngày</option><option value="3">3 ngày</option><option value="7">7 ngày</option></select></div></div><div className="panel setting-section"><h3>Xuất & sao lưu dữ liệu</h3><p>Tải dữ liệu cá nhân về thiết bị của bạn.</p><div className="export-actions"><button className="secondary-btn" onClick={exportCSV}><Icon name="download" size={17}/>Xuất CSV</button><button className="secondary-btn" onClick={exportJSON}><Icon name="download" size={17}/>Sao lưu JSON</button><button className="secondary-btn" onClick={()=>window.print()}><Icon name="calendar" size={17}/>In lịch</button></div></div></div></div></div>; }

function DeadlineModal({ subjects, onClose, onSave }) { const [form,setForm]=useState({title:'',subject:'web',type:'Bài tập',due:'2026-11-15T23:59',priority:'Trung bình',status:'Chưa làm',progress:0,hours:2,reminder:3,description:''}); const submit=(e)=>{e.preventDefault();if(!form.title.trim())return;onSave(form)}; return <div className="modal-layer" onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}><form className="modal-card" onSubmit={submit}><div className="modal-head"><div><span className="eyebrow">CÔNG VIỆC MỚI</span><h2>Thêm deadline</h2></div><button type="button" className="icon-btn" onClick={onClose}><Icon name="x"/></button></div><div className="form-grid"><label className="full"><span>Tiêu đề *</span><input autoFocus value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Ví dụ: Báo cáo project Web" required/></label><label><span>Môn học</span><select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>{subjects.map(s=><option value={s.id} key={s.id}>{s.name}</option>)}</select></label><label><span>Loại công việc</span><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Bài tập</option><option>Project</option><option>Kiểm tra</option><option>Thi</option><option>Thuyết trình</option></select></label><label><span>Hạn nộp</span><input type="datetime-local" value={form.due} onChange={e=>setForm({...form,due:e.target.value})}/></label><label><span>Mức ưu tiên</span><select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>Thấp</option><option>Trung bình</option><option>Cao</option></select></label><label><span>Thời gian dự kiến</span><div className="input-unit"><input type="number" min="1" value={form.hours} onChange={e=>setForm({...form,hours:Number(e.target.value)})}/><b>giờ</b></div></label><label><span>Nhắc trước</span><select value={form.reminder} onChange={e=>setForm({...form,reminder:Number(e.target.value)})}><option value="1">1 ngày</option><option value="3">3 ngày</option><option value="7">7 ngày</option></select></label><label className="full"><span>Mô tả</span><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Ghi chú yêu cầu, link tài liệu..."/></label></div><div className="modal-actions"><button type="button" className="secondary-btn" onClick={onClose}>Hủy</button><button className="primary-btn"><Icon name="plus" size={17}/>Tạo deadline</button></div></form></div>; }

function DeadlineDrawer({ item, subject, onClose, update, remove, duplicate }) { const toggleCheck=(index)=>{ const list=item.checklist.map((c,i)=>i===index?{...c,done:!c.done}:c); const progress=list.length?Math.round(list.filter(c=>c.done).length/list.length*100):item.progress; update(item.id,{checklist:list,progress,status:progress===100?'Hoàn thành':'Đang làm'});}; return <div className="drawer-layer" onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}><aside className="detail-drawer"><div className="drawer-head"><button className="icon-btn" onClick={onClose}><Icon name="x"/></button><div><button className="icon-btn" title="Nhân bản" onClick={()=>duplicate(item)}><Icon name="copy"/></button><button className="icon-btn danger" onClick={()=>remove(item.id)}><Icon name="trash"/></button></div></div><span className="subject-pill"><i style={{background:subject.color}}/>{subject.name}</span><h2>{item.title}</h2><p className="drawer-description">{item.description}</p><div className="detail-grid"><div><span>Hạn nộp</span><strong className={item.status==='Quá hạn'?'overdue-text':''}><Icon name="calendar" size={17}/>{formatDate(item.due)}</strong></div><div><span>Ưu tiên</span><b className={`priority-badge ${item.priority.toLowerCase().replace(' ','-')}`}>{item.priority}</b></div><div><span>Loại</span><strong>{item.type}</strong></div><div><span>Dự kiến</span><strong>{item.hours} giờ</strong></div></div><div className="drawer-progress"><div><strong>Tiến độ</strong><b>{item.progress}%</b></div><i><span style={{width:`${item.progress}%`,background:subject.color}}/></i><input type="range" min="0" max="100" step="5" value={item.progress} onChange={e=>update(item.id,{progress:Number(e.target.value),status:Number(e.target.value)===100?'Hoàn thành':'Đang làm'})}/></div><div className="checklist-section"><div className="panel-head"><h3>Checklist</h3><span>{item.checklist.filter(c=>c.done).length}/{item.checklist.length}</span></div>{item.checklist.map((c,i)=><label key={i}><input type="checkbox" checked={c.done} onChange={()=>toggleCheck(i)}/><i><Icon name="check" size={14}/></i><span>{c.text}</span></label>)}<button className="add-check"><Icon name="plus" size={16}/>Thêm bước công việc</button></div><button className={`primary-btn complete-btn ${item.status==='Hoàn thành'?'completed':''}`} onClick={()=>update(item.id,item.status==='Hoàn thành'?{status:'Đang làm',progress:80}:{status:'Hoàn thành',progress:100})}><Icon name="check" size={18}/>{item.status==='Hoàn thành'?'Đã hoàn thành':'Đánh dấu hoàn thành'}</button></aside></div>; }

function AuthScreen({ mode, setMode, onAuth }) { const [show,setShow]=useState(false); return <div className="auth-page"><div className="auth-visual"><div className="auth-brand"><div className="brand-mark"><Icon name="calendar" size={23}/></div><strong>UniPlan</strong></div><div className="auth-message"><span className="eyebrow">HỌC TẬP CÓ KẾ HOẠCH</span><h1>Biến mọi deadline<br/>thành một <em>cột mốc.</em></h1><p>Quản lý lịch học, theo dõi tiến độ và làm chủ học kỳ của bạn — tất cả trong một không gian.</p><div className="auth-testimonial"><div>“</div><p>UniPlan giúp mình không còn bỏ sót deadline và chủ động hơn rất nhiều trong mỗi học kỳ.</p><span><b>TH</b><strong>Trần Hoàng</strong><small>Sinh viên CNTT • K66</small></span></div></div><div className="auth-orbit"><i/><i/><i/></div></div><div className="auth-form-wrap"><form className="auth-form" onSubmit={(e)=>{e.preventDefault();onAuth()}}><div className="mobile-auth-brand"><div className="brand-mark"><Icon name="calendar"/></div><strong>UniPlan</strong></div><span className="eyebrow">CHÀO MỪNG TRỞ LẠI</span><h2>{mode==='login'?'Đăng nhập tài khoản':'Tạo tài khoản mới'}</h2><p>{mode==='login'?'Tiếp tục hành trình học tập của bạn.':'Bắt đầu một học kỳ có tổ chức hơn.'}</p>{mode==='register'&&<label><span>Họ và tên</span><input placeholder="Nguyễn Văn An" required/></label>}<label><span>Email sinh viên</span><input type="email" defaultValue={mode==='login'?'minh.nguyen@university.edu.vn':''} placeholder="you@university.edu.vn" required/></label><label><span>Mật khẩu</span><div className="password-field"><input type={show?'text':'password'} defaultValue={mode==='login'?'uniplan123':''} placeholder="Tối thiểu 8 ký tự" required/><button type="button" onClick={()=>setShow(!show)}>{show?'Ẩn':'Hiện'}</button></div></label>{mode==='login'&&<div className="remember"><label><input type="checkbox" defaultChecked/> Ghi nhớ đăng nhập</label><button type="button">Quên mật khẩu?</button></div>}<button className="primary-btn auth-submit">{mode==='login'?'Đăng nhập':'Tạo tài khoản'}<Icon name="arrow" size={18}/></button><div className="auth-switch">{mode==='login'?'Chưa có tài khoản?':'Đã có tài khoản?'} <button type="button" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login'?'Đăng ký miễn phí':'Đăng nhập'}</button></div><small className="auth-demo">Đây là bản frontend demo — nhấn đăng nhập để khám phá.</small></form></div></div>; }

export default App;
