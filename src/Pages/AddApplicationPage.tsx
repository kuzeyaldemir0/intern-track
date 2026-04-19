import Modal from '../Components/Modal';
import ApplicationForm from '../Components/ApplicationForm';
import type { ApplicationFormData } from '../Components/ApplicationForm';

interface AddApplicationPageProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationFormData) => void;
}

export default function AddApplicationPage({
  open,
  onClose,
  onSubmit,
}: AddApplicationPageProps) {
  return (
    <Modal open={open} onClose={onClose} title="New Application">
      <ApplicationForm
        submitLabel="Create"
        onSubmit={(data) => {
          onSubmit(data);
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
}
