export const STORAGE_KEY = 'diwa2110_students_v1'
export const EMAIL_DOMAIN = '@limkokwing.ac.ls'
export const MIN_AGE = 16
export const MAX_AGE = 65

export const COURSES = [
  'Diploma in Information Technology',
  'Diploma in Business Information Technology',
]

export const STATUSES = ['Active', 'Enrolled', 'Pending', 'Suspended', 'Graduated']

export const SEED_STUDENTS = [
  { id: '901004821', fullName: 'Lerato Molapo', age: 21, email: 'lerato.molapo@limkokwing.ac.ls', course: COURSES[0], status: 'Active', isActive: true },
  { id: '901003719', fullName: 'Thabo Ramatla', age: 22, email: 'thabo.ramatla@limkokwing.ac.ls', course: COURSES[1], status: 'Active', isActive: true },
  { id: '901005112', fullName: 'Mpho Sehloho', age: 20, email: 'mpho.sehloho@limkokwing.ac.ls', course: COURSES[0], status: 'Enrolled', isActive: true },
  { id: '901002984', fullName: 'Keketso Mohale', age: 23, email: 'keketso.mohale@limkokwing.ac.ls', course: COURSES[1], status: 'Pending', isActive: false },
  { id: '901006341', fullName: 'Nthabiseng Tlali', age: 21, email: 'nthabiseng.tlali@limkokwing.ac.ls', course: COURSES[0], status: 'Active', isActive: true },
  { id: '901001889', fullName: 'Tsepiso Letsie', age: 24, email: 'tsepiso.letsie@limkokwing.ac.ls', course: COURSES[1], status: 'Suspended', isActive: false },
]
