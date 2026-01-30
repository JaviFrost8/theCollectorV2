'use client';

import { useContextAuth } from '@/context/AuthContext';
import { CollectionContent } from '../components/CollectionContent';

export default function CollectionPage() {
  const { user, loading } = useContextAuth();

  if (loading) {
    <p>Cargando usuario...</p>;
  }

  if (!user) {
    return (
      <p className="flex justify-center">
        Debes iniciar sesión para ver tu colección
      </p>
    );
  }

  return <CollectionContent uid={user.uid} />;
}
