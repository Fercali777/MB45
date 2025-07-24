import { useEffect, useState } from "react";
import axios from "axios";
import "./product-list.css";
const API_URL = import.meta.env.VITE_API_URL;
interface Comment {
  _id: string;
  userId: string;
  text: string;
  createdAt: string;
}

interface CommentListProps {
  productId: string;
} 

const CommentList = ({ productId }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        
        const res = await axios.get(`${API_URL}/comments/${productId}`);
        if (Array.isArray(res.data)) {
          setComments(res.data);
        } else {
          console.error("Comments are not an array:", res.data);
        }
      } catch (err) {
        console.error("Error getting comments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchComments();
    }
  }, [productId]);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div >
      {comments.length === 0 ? (
        <p>There are no comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <p>{comment.text}</p>
            <p><small>{new Date(comment.createdAt).toLocaleString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;