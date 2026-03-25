import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    likePostAsync,
    addCommentAsync,
    deletePostAsync,
    dislikePostAsync
} from '../../redux/postSlice';
import EditPostModal from "./EditPostModal";
import { toast } from 'react-toastify';

const dropdownButtonStyle = {
    width: '100%',
    padding: '10px 16px',
    textAlign: 'left',
    background: 'none',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    color: 'inherit',
    transition: 'background 0.2s'
};

const actionButtonStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    color: isActive ? '#2563eb' : '#64748b',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background 0.2s'
});

const Post = ({ item }) => {
    const [showMore, setShowMore] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [comment, setComment] = useState("");
    // const [liked, setLiked] = useState(false);
    // const [disliked, setDisliked] = useState(false);
    const [commentBox, setCommentBox] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const post = useSelector((state) => state.POST)
    const { dark } = useSelector((state) => state.AUTH);
    const liked = item.userLiked;
    const disliked = item.userDisliked;

    const dispatch = useDispatch()

    const toggleLike = () => {
        dispatch(likePostAsync({ postId: item._id }));
    };

    const toggleDislike = () => {
        dispatch(dislikePostAsync({ postId: item._id }));
    };

    const addComment = () => {
        if (comment.trim()) {
            dispatch(addCommentAsync({
                postId: item._id,
                text: comment
            }))
                .unwrap()
                .then(() => setComment(""))
                .catch(err => alert("Comment failed: " + err));
        }
    };

    const toggleCommentBox = () => {
        setCommentBox(!commentBox);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(deletePostAsync(item._id))
                .unwrap()
                .then(() => {
                    toast.success("Post deleted successfully");
                })
                .catch((err) => {
                    alert("Failed to delete post: " + err);
                });
        }
    };

    const getTimeElapsed = (createdTime) => {
        const createdDate = new Date(createdTime).getTime();
        const currentTime = new Date().getTime();
        const seconds = (currentTime - createdDate) / 1000;

        if (seconds < 0) return "Just now";

        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        return days > 0 ? `${days}d` : hours > 0 ? `${hours}h` : `${Math.max(0, minutes)}m`;
    };

    return (
        <div style={{
            backgroundColor: dark ? '#1e293b' : '#ffffff',
            borderRadius: '12px',
            border: dark ? '1px solid #334155' : '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            maxWidth: '576px',
            margin: '16px auto',
            width: '100%',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '700', color: '#2563eb', fontSize: '14px' }}>{item.username}</span>
                    <span style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '12px' }}>
                        • {getTimeElapsed(item.createdAt)} ago
                    </span>
                </div>
                <div style={{ position: 'relative' }}>
                    <button
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px',
                            color: dark ? '#94a3b8' : '#64748b', padding: '0 8px'
                        }}
                        onClick={() => setShowEdit(!showEdit)}
                    >⋮</button>

                    {showEdit && (
                        <div style={{
                            position: 'absolute', zIndex: 10, right: 0, top: '25px',
                            backgroundColor: dark ? '#0f172a' : '#ffffff',
                            borderRadius: '8px', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                            minWidth: '140px', overflow: 'hidden'
                        }}>
                            <button onClick={() => setShowEditModal(true)} style={dropdownButtonStyle}>Edit Post</button>
                            <button onClick={handleDelete} style={{ ...dropdownButtonStyle, color: '#ef4444' }}>Delete Post</button>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ px: '16px', padding: '0 16px 12px 16px' }}>
                <p style={{
                    color: dark ? '#f1f5f9' : '#1e293b', fontSize: '15px',
                    lineHeight: '1.6', whiteSpace: 'pre-wrap', margin: 0
                }}>
                    {showMore ? item.content : `${item.content.substring(0, 250)}`}
                    {item.content.length > 250 && (
                        <button
                            style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', marginLeft: '4px' }}
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Show less" : "...Show more"}
                        </button>
                    )}
                </p>
            </div>

            {item.imageSrc && item.imageSrc.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '0 16px 16px 16px' }}>
                    {item.imageSrc.slice(0, 3).map((src, index) => (
                        <img
                            key={index}
                            style={{
                                flex: '1 1 100px', height: '180px', objectFit: 'cover',
                                borderRadius: '8px', cursor: 'pointer', border: `1px solid ${dark ? '#334155' : '#f1f5f9'}`
                            }}
                            src={src} alt={`post-${index}`}
                        />
                    ))}
                    {item.imageSrc.length > 3 && (
                        <div
                            style={{
                                flex: '1 1 100px', height: '180px', backgroundColor: 'rgba(0,0,0,0.7)',
                                color: 'white', borderRadius: '8px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold'
                            }}
                        >
                            +{item.imageSrc.length - 3}
                        </div>
                    )}
                </div>
            )}

            {/* Footer Actions */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', padding: '12px 16px',
                borderTop: `1px solid ${dark ? '#334155' : '#f1f5f9'}`, backgroundColor: dark ? '#1e293b' : '#fafafa'
            }}>
                <button style={actionButtonStyle(liked)} onClick={toggleLike}>
                    <img width="18" height="18" src={liked ? "https://img.icons8.com/ios-filled/50/2563eb/facebook-like.png" : "https://img.icons8.com/ios/50/64748b/facebook-like.png"} alt="like" />
                    <span>Like ({item.likes?.length || item.likes})</span>
                </button>

                <button style={actionButtonStyle(disliked)} onClick={toggleDislike}>
                    <img width="18" height="18" src={disliked ? "https://img.icons8.com/ios-filled/50/2563eb/thumbs-down.png" : "https://img.icons8.com/ios/50/64748b/thumbs-down.png"} alt="dislike" />
                    <span>Dislike ({item.dislikes?.length || item.dislikes})</span>
                </button>

                <button style={actionButtonStyle(false)} onClick={toggleCommentBox}>
                    <img width="18" height="18" src="https://img.icons8.com/ios/50/64748b/comments.png" alt="comments" />
                    <span>Comments ({item.comments?.length || 0})</span>
                </button>
            </div>

            {/* Comment Box */}
            {commentBox && (
                <div style={{ padding: '16px', backgroundColor: dark ? '#0f172a' : '#f8fafc', borderTop: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '12px' }}>
                        {item.comments?.map((c, index) => (
                            <div key={index} style={{ marginBottom: '8px', fontSize: '13px' }}>
                                <span style={{ fontWeight: '700', color: '#2563eb', marginRight: '6px' }}>{c.username}</span>
                                <span style={{ color: dark ? '#cbd5e1' : '#475569' }}>{c.text}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <textarea
                            style={{
                                flex: 1, padding: '8px 12px', borderRadius: '20px',
                                border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, fontSize: '13px',
                                outline: 'none', resize: 'none', backgroundColor: dark ? '#1e293b' : '#fff',
                                color: dark ? '#fff' : '#000'
                            }}
                            rows="1" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..."
                        />
                        <button onClick={addComment} style={{
                            backgroundColor: '#2563eb', color: '#fff', border: 'none',
                            borderRadius: '20px', padding: '0 16px', fontWeight: '600', cursor: 'pointer'
                        }}>Post</button>
                    </div>
                </div>
            )}

            {showEditModal && (
                <EditPostModal
                    open={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setShowEdit(false);
                    }}
                    postData={item}
                />
            )}
        </div>
    );
};

export default Post;
