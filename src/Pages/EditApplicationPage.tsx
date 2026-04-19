import Modal from '../Components/Modal';
import ApplicationForm from '../Components/ApplicationForm';
import type { ApplicationFormData } from '../Components/ApplicationForm';
import type { Application } from '../Interfaces/Application';

interface EditApplicationPageProps {
  application: Application | null;
  onClose: () => void;
  onSubmit: (id: string, data: ApplicationFormData) => void;
}

export default function EditApplicationPage({
  application,
  onClose,
  onSubmit,
}: EditApplicationPageProps) {
  return (
    <Modal
      open={application !== null}
      onClose={onClose}
      title="Edit Application"
    >
      {application && (
        <ApplicationForm
          initial={application}
          submitLabel="Save Changes"
          onSubmit={(data) => {
            onSubmit(application.id, data);
            onClose();
          }}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
}
