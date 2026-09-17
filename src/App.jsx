import { useMemo, useState } from 'react'
import { Archive, BarChart3, Check, CheckCircle2, ChevronDown, CirclePlus, Clock3, FileCheck2, Filter, LayoutDashboard, ListChecks, Search, Settings2, Timer, Trash2, X } from 'lucide-react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Implement user authentication', description: 'Add user authentication functionality to the website.', owner: 'Puskar Roy', start: 'Apr 1, 2024', end: 'Apr 25, 2024', status: 'Completed', priority: 'P1', accent: 'mint' },
  { id: 2, title: 'Update website content', description: 'Update the About Us page with new team members.', owner: 'Puskar Roy', start: 'Apr 1, 2024', end: 'Apr 4, 2024', status: 'Pending', priority: 'P0', accent: 'yellow' },
  { id: 3, title: 'Design new logo', description: 'Create a new logo for the company rebranding.', owner: 'Puskar Roy', start: 'Apr 1, 2024', end: 'Apr 18, 2024', status: 'In Progress', priority: 'P2', accent: 'blue' },
  { id: 4, title: 'Deploy marketing campaign', description: 'Launch the spring campaign across all social channels.', owner: 'Puskar Roy', start: 'Apr 6, 2024', end: 'Apr 20, 2024', status: 'In Progress', priority: 'P2', accent: 'lavender' },
  { id: 5, title: 'Review project timelines', description: 'Align all delivery milestones with the product team.', owner: 'Puskar Roy', start: 'Apr 3, 2024', end: 'Apr 12, 2024', status: 'Pending', priority: 'P1', accent: 'gray' },
  { id: 6, title: 'Drop Database', description: 'Clean up the staging database after the migration.', owner: 'Puskar Roy', start: 'Apr 12, 2024', end: 'Apr 21, 2024', status: 'Deferred', priority: 'P2', accent: 'blue' },
]

const navItems = [[LayoutDashboard, 'Dashboard'], [CheckCircle2, 'Completed Tasks'], [FileCheck2, 'Pending Tasks'], [Timer, 'In Progress Tasks'], [Archive, 'Deployed Tasks'], [Clock3, 'Deferred Tasks']]
const navStatus = { 'Completed Tasks': 'Completed', 'Pending Tasks': 'Pending', 'In Progress Tasks': 'In Progress', 'Deployed Tasks': 'Deployed', 'Deferred Tasks': 'Deferred' }

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [status, setStatus] = useState('All Status')
  const [priority, setPriority] = useState('All Priority')
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [account, setAccount] = useState({ name: 'Puskar Roy', email: 'puskar.roy@example.com', role: 'Product team' })
  const [newAccount, setNewAccount] = useState({ name: '', email: '', role: 'Product team' })
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'P1' })

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesStatus = status === 'All Status' || task.status === status
    const matchesPriority = priority === 'All Priority' || task.priority === priority
    const matchesQuery = `${task.title} ${task.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesStatus && matchesPriority && matchesQuery
  }), [priority, query, status, tasks])

  const addTask = (event) => {
    event.preventDefault()
    if (!newTask.title.trim()) return
    setTasks((current) => [...current, { id: Date.now(), title: newTask.title, description: newTask.description || 'New task ready to be planned.', owner: 'You', start: 'Sep 17, 2026', end: 'Sep 24, 2026', status: 'Pending', priority: newTask.priority, accent: 'yellow' }])
    setNewTask({ title: '', description: '', priority: 'P1' })
    setShowModal(false)
  }

  const selectView = (label) => {
    setActiveNav(label)
    setStatus(navStatus[label] || 'All Status')
    setQuery('')
  }

  const selectStatus = (nextStatus) => {
    setStatus(nextStatus)
    const matchingView = Object.entries(navStatus).find(([, viewStatus]) => viewStatus === nextStatus)
    setActiveNav(matchingView ? matchingView[0] : 'Dashboard')
  }

  const addAccount = (event) => {
    event.preventDefault()
    if (!newAccount.name.trim() || !newAccount.email.trim()) return
    setAccount(newAccount)
    setNewAccount({ name: '', email: '', role: 'Product team' })
    setShowAccountModal(false)
    setShowAccountMenu(false)
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><ListChecks size={19} /></span><span>Task Manager</span></div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(([Icon, label]) => <button className={activeNav === label ? 'nav-item active' : 'nav-item'} key={label} onClick={() => selectView(label)}><Icon size={18} strokeWidth={2.1} /> <span>{label}</span></button>)}
          <button className="nav-item add-link" onClick={() => setShowModal(true)}><CirclePlus size={18} /> <span>Add New Task</span></button>
          <button className="nav-item"><BarChart3 size={18} /> <span>Task Stats</span></button>
        </nav>
        <div className="sidebar-footer"><Settings2 size={17} /> Workspace settings</div>
      </aside>

      <section className="content">
        <header className="topbar"><div className="mobile-brand"><ListChecks size={19} /> Task Manager</div><div className="account-wrap"><button className="profile" onClick={() => setShowAccountMenu((visible) => !visible)} aria-expanded={showAccountMenu}><span className="avatar">{account.name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}</span><span><strong>{account.name}</strong><small>{account.role}</small></span><ChevronDown size={15} /></button>{showAccountMenu && <div className="account-menu"><div className="account-details"><strong>{account.name}</strong><span>{account.email}</span><small>{account.role}</small></div><button onClick={() => setShowAccountModal(true)}>Add new account</button></div>}</div></header>
        <div className="page-heading"><div><p className="eyebrow">Workspace / {activeNav}</p><h1>Task Board</h1><p className="subtitle">Keep your team moving with a clear view of what is next.</p></div><button className="primary-button" onClick={() => setShowModal(true)}><CirclePlus size={17} /> Add new task</button></div>
        <div className="toolbar"><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks" /></label><div className="toolbar-actions"><Filter size={16} /><span className="filter-label">Filter by</span><select value={status} onChange={(event) => selectStatus(event.target.value)}><option>All Status</option><option>Completed</option><option>Pending</option><option>In Progress</option><option>Deployed</option><option>Deferred</option></select><select value={priority} onChange={(event) => setPriority(event.target.value)}><option>All Priority</option><option>P0</option><option>P1</option><option>P2</option></select><button className="clear-button" onClick={() => { setStatus('All Status'); setPriority('All Priority'); setQuery(''); setActiveNav('Dashboard') }}>Clear</button></div></div>
        <div className="board-meta"><span>{activeNav === 'Dashboard' ? 'All tasks' : activeNav} <b>{visibleTasks.length}</b></span><span className="legend"><span className="legend-dot"></span> Updated just now</span></div>
        <div className="task-grid">{visibleTasks.map((task) => <TaskCard key={task.id} task={task} onDelete={() => setTasks((current) => current.filter((item) => item.id !== task.id))} onStatusChange={(nextStatus) => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, status: nextStatus } : item))} />)}{!visibleTasks.length && <div className="empty-state"><Search size={30} /><h2>No tasks found</h2><p>Try changing your filters or search terms.</p></div>}</div>
      </section>
      {showModal && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowModal(false)}><form className="modal" onSubmit={addTask}><div className="modal-header"><div><p className="eyebrow">New item</p><h2>Create a task</h2></div><button type="button" className="icon-button" onClick={() => setShowModal(false)} aria-label="Close"><X size={19} /></button></div><label>Task title<input autoFocus value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })} placeholder="e.g. Prepare launch checklist" /></label><label>Description<textarea value={newTask.description} onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} placeholder="What needs to happen?" rows="3" /></label><label>Priority<select value={newTask.priority} onChange={(event) => setNewTask({ ...newTask, priority: event.target.value })}><option>P0</option><option>P1</option><option>P2</option></select></label><button className="primary-button modal-submit" type="submit"><Check size={17} /> Create task</button></form></div>}
      {showAccountModal && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowAccountModal(false)}><form className="modal" onSubmit={addAccount}><div className="modal-header"><div><p className="eyebrow">Workspace access</p><h2>Add new account</h2></div><button type="button" className="icon-button" onClick={() => setShowAccountModal(false)} aria-label="Close"><X size={19} /></button></div><label>Full name<input autoFocus value={newAccount.name} onChange={(event) => setNewAccount({ ...newAccount, name: event.target.value })} placeholder="e.g. Ananya Sharma" /></label><label>Email address<input type="email" value={newAccount.email} onChange={(event) => setNewAccount({ ...newAccount, email: event.target.value })} placeholder="name@company.com" /></label><label>Role<select value={newAccount.role} onChange={(event) => setNewAccount({ ...newAccount, role: event.target.value })}><option>Product team</option><option>Design team</option><option>Engineering team</option><option>Workspace admin</option></select></label><button className="primary-button modal-submit" type="submit"><Check size={17} /> Add account</button></form></div>}
    </main>
  )
}

function TaskCard({ task, onDelete, onStatusChange }) {
  const statusClass = task.status.toLowerCase().replace(' ', '-')
  return <article className="task-card"><div className={`task-banner ${task.accent}`}><span className="priority">{task.priority}</span><h2>{task.title}</h2></div><p className="task-description">{task.description}</p><div className="date-row"><div><span>Start date</span><strong>{task.start}</strong></div><div><span>End date</span><strong>{task.end}</strong></div></div><div className="card-footer"><span className="owner"><span className="owner-avatar">{task.owner.split(' ').map((word) => word[0]).join('')}</span>{task.owner}</span><select className={`status-pill ${statusClass}`} value={task.status} onChange={(event) => onStatusChange(event.target.value)} aria-label={`Status for ${task.title}`}><option>Completed</option><option>Pending</option><option>In Progress</option><option>Deferred</option></select><button className="delete-button" onClick={onDelete} aria-label={`Delete ${task.title}`}><Trash2 size={14} /></button></div></article>
}

export default App
