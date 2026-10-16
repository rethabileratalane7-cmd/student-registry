import { EMAIL_DOMAIN, MIN_AGE, MAX_AGE, COURSES, STATUSES } from './constants.js'

const ID_PATTERN = /^901\d{6}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateStudent = (values, students, isEditing) => {
  const errors = {}

  const id = values.id.trim()
  if (!id) errors.id = 'Student ID is required.'
  else if (!ID_PATTERN.test(id)) errors.id = 'ID must be 9 digits starting with 901.'
  else if (!isEditing && students.some((s) => s.id === id)) errors.id = 'A student with this ID already exists.'

  const name = values.fullName.trim()
  if (!name) errors.fullName = 'Full name is required.'
  else if (name.length < 3) errors.fullName = 'Name must be at least 3 characters.'
  else if (!name.includes(' ')) errors.fullName = 'Enter first name and surname.'

  const age = Number(values.age)
  if (values.age.trim() === '') errors.age = 'Age is required.'
  else if (!Number.isInteger(age)) errors.age = 'Age must be a whole number.'
  else if (age < MIN_AGE || age > MAX_AGE) errors.age = `Age must be between ${MIN_AGE} and ${MAX_AGE}.`

  const email = values.email.trim().toLowerCase()
  if (!email) errors.email = 'Email is required.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.'
  else if (!email.endsWith(EMAIL_DOMAIN)) errors.email = `Email must end with ${EMAIL_DOMAIN}.`

  if (!COURSES.includes(values.course)) errors.course = 'Choose a course.'
  if (!STATUSES.includes(values.status)) errors.status = 'Choose a status.'

  return errors
}

export const createStudent = (values) => ({
  id: values.id.trim(),
  fullName: values.fullName.trim(),
  age: Number(values.age),
  email: values.email.trim().toLowerCase(),
  course: values.course,
  status: values.status,
  isActive: values.status === 'Active' || values.status === 'Enrolled',
})

export function countByStatus(students) {
  var counts = {}
  students.forEach((s) => {
    counts[s.status] = (counts[s.status] || 0) + 1
  })
  return counts
}

export const generateId = (students) => {
  let candidate
  do {
    candidate = '901' + String(Math.floor(100000 + Math.random() * 900000)).slice(0, 6)
  } while (students.some((s) => s.id === candidate))
  return candidate
}
