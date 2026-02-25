import { useEffect, useState } from 'react';
import { UserMovie } from '../firebase/movies';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

interface Props {
  isOpen: boolean;
  movie: UserMovie | null;
  onClose: () => void;
  uid: string;
}

export default function EditMovieModal({ isOpen, onClose, movie, uid }: Props) {
  const [price, setPrice] = useState<string>('');
  const [watchedStatus, setWatchedStatus] = useState<'Not watched' | 'Watched'>(
    'Not watched',
  );

  useEffect(() => {
    if (!movie) return;

    const timeoutId = setTimeout(() => {
      setPrice(movie?.price?.toString() ?? '');
      setWatchedStatus(movie.status ?? '');
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [movie, isOpen]);

  if (!isOpen) return null;

  const addedDate =
    movie?.addedAt && 'toDate' in movie.addedAt ? movie.addedAt.toDate() : null;

  async function handleSave() {
    if (!movie) return;

    const movieRef = doc(db, 'users', uid, 'movies', movie?.tmdbId.toString());

    await updateDoc(movieRef, {
      price: price ? Number(price) : null,
      status: watchedStatus,
      updatedAt: serverTimestamp(),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-10 bg-black/70 flex items-center justify-center select-none">
      <div className="bg-[#384a70] rounded-md p-6 w-full max-w-md">
        <div className="flex justify-between mb-3 border-b border-b-[#2c3e64] pb-3">
          <h2>Edición Rápida</h2>{' '}
          <button className="cursor-pointer" onClick={() => onClose()}>
            X
          </button>
        </div>
        <div className="border border-[#48597e] p-2 bg-[#2e3d5e] rounded-md mb-3">
          <h2>
            <strong>{movie?.title}</strong>
          </h2>
          <span className="text-sm">
            Añadida el{' '}
            {addedDate?.toLocaleString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }) ?? ''}
          </span>
        </div>
        <form>
          <div className="flex flex-col gap-1">
            <label>Precio de compra</label>
            <input
              className="border border-[#48597e] bg-[#2e3d5e] p-3 rounded-md outline-0"
              type="number"
              value={price ?? ''}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
              step={0.01}
              placeholder="Ej: 14,99"
            />
          </div>
          <div className="flex py-2 my-3 gap-3">
            <label className="p-1" htmlFor="options">
              Estado
            </label>
            <select
              id="options"
              name="options"
              value={watchedStatus}
              onChange={(e) =>
                setWatchedStatus(e.target.value as 'Watched' | 'Not watched')
              }
              className="bg-[#2e3d5e] p-1 cursor-pointer border border-[#48597e] outline-0 rounded-md"
            >
              <option value="No Watched">No vista</option>
              <option value="Watched">Vista</option>
            </select>
          </div>
        </form>
        <div className="flex justify-between">
          <button className="cursor-pointer" onClick={() => onClose()}>
            Cancelar
          </button>
          <button
            className="cursor-pointer bg-blue-500 p-2 rounded-md"
            onClick={() => handleSave()}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
