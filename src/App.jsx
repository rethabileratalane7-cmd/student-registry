import './App.css'
import { useState, useEffect, useMemo } from 'react'
import Toolbar from './assets/Toolbar.jsx'
import StatCards from './assets/StatCards.jsx'
import StudentList from './assets/StudentList.jsx'
import StudentModal from './assets/StudentModal.jsx'
import DeleteModal from './assets/DeleteModal.jsx'
import { loadStudents, saveStudents } from './storage.js'

export default function App() {
  const [students, setStudents] = useState(loadStudents)

  const [search, setSearch] = useState('')
  const [course, setCourse] = useState('ALL')
  const [status, setStatus] = useState('ALL')
  const [view, setView] = useState('table')
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    saveStudents(students)
  }, [students])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const addStudent = (student) => {
    setStudents((prev) => [student, ...prev])
    setToast(`${student.fullName} was added.`)
    setModal(null)
  }

  const updateStudent = (updated) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
    setToast(`${updated.fullName} was updated.`)
    setModal(null)
  }

  const deleteStudent = (id) => {
    const removed = students.find((s) => s.id === id)
    setStudents((prev) => prev.filter((s) => s.id !== id))
    setToast(`${removed ? removed.fullName : 'Student'} was deleted.`)
    setModal(null)
  }

  const resetFilters = () => {
    setSearch('')
    setCourse('ALL')
    setStatus('ALL')
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return students.filter((s) => {
      const matchesSearch = !q || [s.id, s.fullName, s.email].some((v) => v.toLowerCase().includes(q))
      const matchesCourse = course === 'ALL' || s.course === course
      const matchesStatus = status === 'ALL' || s.status === status
      return matchesSearch && matchesCourse && matchesStatus
    })
  }, [students, search, course, status])

  const closeModal = () => setModal(null)

  return (
    <>
      <div className="utility">
        <span>Office of the Registrar · Maseru Campus</span>
      </div>

      <header className="masthead">
        <div className="masthead-inner">
          <div className="crest" aria-hidden="true"><span>LL</span></div>
          <div className="wordmark">
            <span className="wm-top">Limkokwing University of Creative Technology</span>
            <span className="wm-main">Lesotho</span>
          </div>
          <nav className="mainnav hide-sm" aria-label="Primary">
            <a className="current" href="#registry">Student Registry</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Office of the Registrar</p>
          <h1>Student Registry</h1>
          <p className="hero-lede">
            The official record of every student enrolled in the Faculty of Information and
            Communication Technology. Review, enrol, amend and withdraw records in one place.
          </p>
          <button className="btn gold" onClick={() => setModal({ type: 'add' })}>Enrol a New Student</button>
        </div>
      </section>

      <main className="page" id="registry">
        <StatCards students={students} />

        <div className="section-head">
          <h2>Enrolment Register</h2>
          <p className="muted">Records are saved in your browser and update instantly.</p>
        </div>

        <Toolbar
          search={search} setSearch={setSearch}
          course={course} setCourse={setCourse}
          status={status} setStatus={setStatus}
          view={view} setView={setView}
          onReset={resetFilters}
          onAdd={() => setModal({ type: 'add' })}
        />

        <section className="panel">
          {filtered.length === 0 ? (
            <div className="empty">
              <h3>{students.length === 0 ? 'No students yet' : 'No students match your filters'}</h3>
              <p className="muted">
                {students.length === 0 ? 'Add your first student to get started.' : 'Try a different search or reset the filters.'}
              </p>
            </div>
          ) : (
            <StudentList
              students={filtered} view={view}
              onEdit={(s) => setModal({ type: 'edit', student: s })}
              onDelete={(s) => setModal({ type: 'delete', student: s })}
            />
          )}
          <div className="panel-foot muted">Showing {filtered.length} of {students.length} records</div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <strong>Limkokwing University of Creative Technology, Lesotho</strong>
            <p>Faculty of Information and Communication Technology · Maseru</p>
          </div>
          <div className="footer-right">
            <p>Created by Rethabile Ratalane(901020408)</p>
            <p>Individual Assignment YEAR 2</p>
          </div>
        </div>
      </footer>

      {modal?.type === 'add' && <StudentModal students={students} onSave={addStudent} onClose={closeModal} />}
      {modal?.type === 'edit' && <StudentModal student={modal.student} students={students} onSave={updateStudent} onClose={closeModal} />}
      {modal?.type === 'delete' && <DeleteModal student={modal.student} onConfirm={() => deleteStudent(modal.student.id)} onClose={closeModal} />}

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  )
}
