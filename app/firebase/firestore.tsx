import { User } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function createUserDocument(user: User) {
  if (!user.uid) return;

  const userRef = doc(db, 'users', user.uid);

  await setDoc(
    userRef,
    {
      id: user.uid,
      email: user.email,
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}
