import { COURSES, STATUSES } from '../constants.js'

export default function Toolbar({ search, setSearch, course, setCourse, status, setStatus, view, setView, onReset, onAdd }) {
  return (
    <div className="toolbar">
      <div className="filters">
        <input className="search" type="search" placeholder="Search by name, number or email"
          value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search students" />
        <select value={course} onChange={(e) => setCourse(e.target.value)} aria-label="Filter by programme">
          <option value="ALL">All programmes</option>
          {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by standing">
          <option value="ALL">All standings</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="link-btn" onClick={onReset}>Clear</button>
      </div>
      <div className="filters">
        <div className="toggle" role="group" aria-label="Layout">
          <button className={view === 'table' ? 'on' : ''} onClick={() => setView('table')}>Register</button>
          <button className={view === 'cards' ? 'on' : ''} onClick={() => setView('cards')}>Portraits</button>
        </div>
        <button className="btn primary" onClick={onAdd}>Enrol Student</button>
      </div>
    </div>
  )
}
