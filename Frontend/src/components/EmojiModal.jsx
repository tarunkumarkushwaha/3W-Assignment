import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";

const EmojiModal = ({ onCancelClick, setinputPost, inputPost, open }) => {
  const { dark } = useSelector((state) => state.AUTH);
  const onEmojiClick = (emojiObject) => {
    setinputPost(inputPost + emojiObject.emoji);
    onCancelClick();
  };

  return (
    <Dialog open={open} onClose={onCancelClick} style={{ position: 'relative', zIndex: 100 }}>

      <DialogBackdrop
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.3s ease'
        }}
      />

      <div style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <DialogPanel style={{
          width: '100%',
          maxWidth: '384px',
          borderRadius: '16px',
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '24px',
          border: dark ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <DialogTitle style={{
            fontSize: '18px',
            fontWeight: '700',
            color: dark ? '#f8fafc' : '#1e293b',
            margin: 0,
            textAlign: 'center'
          }}>
            Select an Emoji
          </DialogTitle>

          <div style={{
            width: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: dark ? '#0f172a' : '#f8fafc'
          }}>
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              theme={dark ? "dark" : "light"}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={onCancelClick}
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '600',
                color: dark ? '#94a3b8' : '#64748b',
                backgroundColor: dark ? '#334155' : '#f1f5f9',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = dark ? '#475569' : '#e2e8f0'}
              onMouseOut={(e) => e.target.style.backgroundColor = dark ? '#334155' : '#f1f5f9'}
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EmojiModal;








