import { useEffect, useState } from "react";
import axios from "axios";

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
        
        const res = await axios.get(`http://localhost:5000/api/comments/${productId}`);
        if (Array.isArray(res.data)) {
          setComments(res.data);
        } else {
          console.error("Comentarios no son un array:", res.data);
        }
      } catch (err) {
        console.error("Error al obtener comentarios:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchComments();
    }
  }, [productId]);

  if (loading) return <p>Cargando comentarios...</p>;

  return (
    <div>
      {comments.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.text}</p>
            <p><small>{new Date(comment.createdAt).toLocaleString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;