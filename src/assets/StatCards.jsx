import { countByStatus } from '../validation.js'
import { COURSES } from '../constants.js'

export default function StatCards({ students }) {
  const counts = countByStatus(students)
  const total = students.length
  const active = students.filter((s) => s.isActive).length
  const dit = students.filter((s) => s.course === COURSES[0]).length
  const dbit = total - dit
  const attention = (counts.Pending || 0) + (counts.Suspended || 0)

  const figures = [
    { label: 'Registered students', value: total, note: 'Records on file' },
    { label: 'In good standing', value: active, note: total ? `${Math.round((active / total) * 100)}% of the cohort` : '—' },
    { label: 'Information Technology', value: dit, note: 'Diploma · DIT' },
    { label: 'Business IT', value: dbit, note: 'Diploma · DBIT' },
    { label: 'Requiring attention', value: attention, note: 'Pending or suspended' },
  ]

  return (
    <section className="ledger" aria-label="Registry summary">
      {figures.map((f) => (
        <div className="ledger-item" key={f.label}>
          <span className="ledger-value">{f.value}</span>
          <span className="ledger-label">{f.label}</span>
          <span className="ledger-note">{f.note}</span>
        </div>
      ))}
    </section>
  )
}
