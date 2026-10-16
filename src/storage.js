import { STORAGE_KEY, SEED_STUDENTS } from './constants.js'

export const loadStudents = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return SEED_STUDENTS
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : SEED_STUDENTS
  } catch (error) {
    console.error('Could not read saved students:', error)
    return SEED_STUDENTS
  }
}

export const saveStudents = (students) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  } catch (error) {
    console.error('Could not save students:', error)
  }
}
