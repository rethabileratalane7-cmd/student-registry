import Modal from './Modal.jsx'

export default function DeleteModal({ student, onConfirm, onClose }) {
  return (
    <Modal title="Confirm Deletion" subtitle="This cannot be undone" onClose={onClose}>
      <p className="confirm-text">
        Are you sure you want to delete <strong>{student.fullName}</strong> (ID{' '}
        <span className="mono">{student.id}</span>)? The record will be removed from the list and from saved data.
      </p>
      <div className="modal-actions">
        <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
        <button type="button" className="btn danger" onClick={onConfirm}>Delete Student</button>
      </div>
    </Modal>
  )
}
