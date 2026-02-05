import './style.css';

interface Props {
  onYes: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<Props> = ({ onYes, onCancel }: Props) => {
  return (
    <div className="delete-popup">
      <div className="delete-popup-content">
        <p>Are you sure you want to Continue?</p>
        <div className="delete-popup-buttons">
          <button className="delete-popup-button no-confirmation-btn" onClick={onCancel}>No</button>
          <button className="delete-popup-button" onClick={onYes}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
