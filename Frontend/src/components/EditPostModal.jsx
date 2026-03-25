import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { updatePostAsync } from '../../redux/postSlice';
import { toast } from "react-toastify";

const EditPostModal = ({ open, onClose, postData }) => {
  const { dark } = useSelector((state) => state.AUTH);

  const [inputPost, setInputPost] = useState(postData.content);
  // const [file, setFile] = useState(postData.imageSrc);  
  const dispatch = useDispatch();

  // function handleChange(e) {
  //   setFile([...file, URL.createObjectURL(e.target.files[0])]);
  // }

  const updatePost = () => {
    if (inputPost.trim() === "") {
      toast.warn("Post cannot be empty");
      return;
    }

    dispatch(updatePostAsync({
      id: postData._id,
      content: inputPost
    }))
      .then(() => {
        toast.success("post updated")
        onClose();
      })
      .catch((err) => {
        toast.error("Update failed: " + err);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} style={{ position: 'relative', zIndex: 100 }}>

      <DialogBackdrop
        style={{
          fixed: 'inset-0',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.3s ease'
        }}
      />

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <DialogPanel style={{
          width: '100%',
          maxWidth: '448px',
          borderRadius: '12px',
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          padding: '24px',
          border: dark ? '1px solid #334155' : '1px solid #e2e8f0',
          transition: 'transform 0.3s ease'
        }}>
          <DialogTitle style={{
            fontSize: '18px',
            fontWeight: '700',
            color: dark ? '#f8fafc' : '#1e293b',
            marginBottom: '16px',
            display: 'block'
          }}>
            Edit Post
          </DialogTitle>

          <textarea
            value={inputPost}
            onChange={(e) => setInputPost(e.target.value)}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '12px',
              border: dark ? '1px solid #334155' : '1px solid #cbd5e1',
              borderRadius: '8px',
              outline: 'none',
              fontSize: '14px',
              backgroundColor: dark ? '#0f172a' : '#f8fafc',
              color: dark ? '#f8fafc' : '#1e293b',
              fontFamily: 'inherit',
              resize: 'vertical',
              marginBottom: '8px'
            }}
            placeholder="Edit your post..."
          />

          <div style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'end',
            gap: '12px'
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 18px',
                color: dark ? '#94a3b8' : '#64748b',
                backgroundColor: 'transparent',
                border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = dark ? '#1e293b' : '#f1f5f9'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Cancel
            </button>

            <button
              onClick={updatePost}
              style={{
                padding: '10px 18px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Update Post
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditPostModal;
