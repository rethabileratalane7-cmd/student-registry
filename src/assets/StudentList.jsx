import StatusBadge from './StatusBadge.jsx'
import Avatar from './Avatar.jsx'

function Actions({ student, onEdit, onDelete }) {
  return (
    <div className="actions">
      <button className="link-btn" onClick={() => onEdit(student)} aria-label={`Edit ${student.fullName}`}>Edit</button>
      <span className="sep" aria-hidden="true">/</span>
      <button className="link-btn danger-link" onClick={() => onDelete(student)} aria-label={`Delete ${student.fullName}`}>Delete</button>
    </div>
  )
}

export default function StudentList({ students, view, onEdit, onDelete }) {
  if (view === 'cards') {
    return (
      <div className="cards">
        {students.map((s) => (
          <article className="card" key={s.id}>
            <div className="card-band">
              <Avatar name={s.fullName} size="lg" />
              <StatusBadge status={s.status} />
            </div>
            <div className="card-body">
              <h3>{s.fullName}</h3>
              <span className="mono id">No. {s.id}</span>
              <dl>
                <div><dt>Programme</dt><dd>{s.course}</dd></div>
                <div><dt>Age</dt><dd>{s.age}</dd></div>
                <div><dt>Email</dt><dd className="mono">{s.email}</dd></div>
              </dl>
            </div>
            <div className="card-foot">
              <Actions student={s} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Student</th><th>Student No.</th><th>Age</th><th>Email</th>
            <th>Programme</th><th>Standing</th><th className="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>
                <div className="person">
                  <Avatar name={s.fullName} />
                  <span className="person-name">{s.fullName}</span>
                </div>
              </td>
              <td className="mono id">{s.id}</td>
              <td>{s.age}</td>
              <td className="mono small-text">{s.email}</td>
              <td>{s.course}</td>
              <td><StatusBadge status={s.status} /></td>
              <td className="right"><Actions student={s} onEdit={onEdit} onDelete={onDelete} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
