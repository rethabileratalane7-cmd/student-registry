const initialsOf = (fullName) =>
  fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

export default function Avatar({ name, size = 'md' }) {
  return <span className={`avatar avatar-${size}`} aria-hidden="true">{initialsOf(name)}</span>
}
