import { useState } from 'react'
import Modal from './Modal.jsx'
import { COURSES, STATUSES, EMAIL_DOMAIN, MIN_AGE, MAX_AGE } from '../constants.js'
import { validateStudent, createStudent, generateId } from '../validation.js'

const emptyForm = { id: '', fullName: '', age: '', email: '', course: COURSES[0], status: 'Active' }

export default function StudentModal({ student, students, onSave, onClose }) {
  const isEditing = Boolean(student)

  const [values, setValues] = useState(
    isEditing ? { ...student, age: String(student.age) } : emptyForm
  )
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateStudent(values, students, isEditing)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    onSave(createStudent(values))
  }

  const field = (name, label, input, hint) => (
    <div className="field">
      <label htmlFor={`f-${name}`}>{label} <span className="req">*</span></label>
      {input}
      {errors[name] ? <span className="error" role="alert">{errors[name]}</span> : hint && <span className="hint">{hint}</span>}
    </div>
  )

  return (
    <Modal
      title={isEditing ? 'Edit Student Record' : 'Add New Student'}
      subtitle="DIWA2110 course enrollment record"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid2">
          {field('id', 'Student ID',
            <div className="with-btn">
              <input id="f-id" name="id" value={values.id} onChange={handleChange}
                readOnly={isEditing} placeholder="e.g. 901007890" className={errors.id ? 'invalid' : ''} />
              {!isEditing && (
                <button type="button" className="btn small" onClick={() => setValues((p) => ({ ...p, id: generateId(students) }))}>Auto</button>
              )}
            </div>,
            '9 digits starting with 901'
          )}
          {field('age', 'Age',
            <input id="f-age" name="age" type="number" value={values.age} onChange={handleChange}
              placeholder="e.g. 21" className={errors.age ? 'invalid' : ''} />,
            `Between ${MIN_AGE} and ${MAX_AGE}`
          )}
        </div>
        {field('fullName', 'Full Name',
          <input id="f-fullName" name="fullName" value={values.fullName} onChange={handleChange}
            placeholder="e.g. Palesa Mofokeng" className={errors.fullName ? 'invalid' : ''} />
        )}
        {field('email', 'Email Address',
          <input id="f-email" name="email" type="email" value={values.email} onChange={handleChange}
            placeholder={`student${EMAIL_DOMAIN}`} className={errors.email ? 'invalid' : ''} />,
          `Must end with ${EMAIL_DOMAIN}`
        )}
        <div className="grid2">
          {field('course', 'Course of Study',
            <select id="f-course" name="course" value={values.course} onChange={handleChange}>
              {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          {field('status', 'Enrollment Status',
            <select id="f-status" name="status" value={values.status} onChange={handleChange}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
        </div>
        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">{isEditing ? 'Update Student' : 'Save Student'}</button>
        </div>
      </form>
    </Modal>
  )
}
