import { useState } from 'react';
import axios from 'axios';

interface Props {
  productId: string;
  onCommentAdded: () => void;
}

const CommentForm = ({ productId, onCommentAdded }: Props) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/comments/${productId}`, // productId en la URL
        { text }, // el backend espera "text", no "content"
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setText('');
      onCommentAdded();
    } catch (err) {
      console.error('Error al enviar comentario:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <button type="submit">Comentar</button>
    </form>
  );
};

export default CommentForm;