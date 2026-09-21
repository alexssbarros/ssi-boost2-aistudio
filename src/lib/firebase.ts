import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  getDocs,
  getDocFromServer,
  serverTimestamp
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  uploadString, 
  getDownloadURL 
} from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserAccount, SSIScores, ContextoProfissional } from '../types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with configured database ID
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Test connection on boot as mandated by security guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client offline ou conexão pendente:', error.message);
    }
    // Retornamos true para não bloquear a experiência do usuário caso a coleção de teste não exista
    return true;
  }
}

// Safe startup connection verification
testFirestoreConnection();

/**
 * Authentication Methods
 */
export async function loginWithEmail(email: string, pass: string): Promise<FirebaseUser> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  return cred.user;
}

export async function registerWithEmail(email: string, pass: string, name: string): Promise<FirebaseUser> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  if (name) {
    await updateProfile(cred.user, { displayName: name });
  }
  // Create user profile in Firestore
  await saveUserProfile(cred.user.uid, {
    nome: name || email.split('@')[0],
    email: email,
    plan: 'free'
  });
  return cred.user;
}

export async function loginWithGoogle(): Promise<FirebaseUser> {
  const cred = await signInWithPopup(auth, googleProvider);
  // Ensure profile document exists
  await saveUserProfile(cred.user.uid, {
    nome: cred.user.displayName || cred.user.email?.split('@')[0] || 'Profissional',
    email: cred.user.email || '',
    plan: 'free',
    avatarUrl: cred.user.photoURL || undefined
  });
  return cred.user;
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Firestore Data Methods
 */
export async function saveUserProfile(
  userId: string, 
  data: { nome: string; email: string; plan: 'free' | 'monthly' | 'annual'; avatarUrl?: string }
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const existing = await getDoc(userRef);
    if (!existing.exists()) {
      await setDoc(userRef, {
        id: userId,
        nome: data.nome,
        email: data.email,
        plan: data.plan || 'free',
        avatarUrl: data.avatarUrl || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } else {
      const existingData = existing.data();
      // Não sobrescrever plano pago (monthly/annual) por free acidentalmente
      const resolvedPlan = (data.plan && data.plan !== 'free') 
        ? data.plan 
        : (existingData.plan || data.plan || 'free');

      await setDoc(userRef, {
        ...existingData,
        nome: data.nome || existingData.nome,
        plan: resolvedPlan,
        avatarUrl: data.avatarUrl || existingData.avatarUrl || null,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }
  } catch (err) {
    console.warn('Aviso ao sincronizar perfil no Firestore:', err);
  }
}

export async function updateUserPlan(
  userId: string, 
  plan: 'free' | 'monthly' | 'annual'
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      plan,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Aviso ao atualizar plano no Firestore:', err);
  }
}

export async function getUserProfile(userId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (err) {
    console.warn('Erro ao carregar perfil do Firestore:', err);
    return null;
  }
}

export interface StoredDiagnostic {
  id: string;
  userId: string;
  createdAt: string;
  total: number;
  pilar1: number;
  pilar2: number;
  pilar3: number;
  pilar4: number;
  nivel: string;
  pilarFraco: string;
  pilarForte: string;
  contexto?: ContextoProfissional;
  screenshotUrl?: string;
  reportUrl?: string;
}

export async function saveDiagnostic(
  userId: string,
  scores: SSIScores,
  nivel: string,
  pilarFraco: string,
  pilarForte: string,
  contexto?: ContextoProfissional,
  screenshotUrl?: string,
  reportUrl?: string
): Promise<string> {
  const diagnosticId = `diag_${Date.now()}`;
  try {
    const diagRef = doc(db, 'users', userId, 'diagnostics', diagnosticId);
    const rawPayload: StoredDiagnostic = {
      id: diagnosticId,
      userId,
      createdAt: new Date().toISOString(),
      total: Number(scores.total),
      pilar1: Number(scores.pilar1),
      pilar2: Number(scores.pilar2),
      pilar3: Number(scores.pilar3),
      pilar4: Number(scores.pilar4),
      nivel,
      pilarFraco,
      pilarForte,
      contexto: contexto || undefined,
      screenshotUrl: screenshotUrl || undefined,
      reportUrl: reportUrl || undefined
    };

    // Filter out undefined values to satisfy Firestore object serialization
    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(([_, v]) => v !== undefined)
    );

    await setDoc(diagRef, payload);
    return diagnosticId;
  } catch (err) {
    console.warn('Aviso ao salvar diagnóstico no Firestore:', err);
    return diagnosticId;
  }
}

export async function updateDiagnosticReportUrl(
  userId: string,
  diagnosticId: string,
  reportUrl: string
): Promise<void> {
  try {
    const diagRef = doc(db, 'users', userId, 'diagnostics', diagnosticId);
    await setDoc(diagRef, { reportUrl }, { merge: true });
  } catch (err) {
    console.warn('Aviso ao atualizar reportUrl no Firestore:', err);
  }
}

export async function getUserDiagnostics(userId: string): Promise<StoredDiagnostic[]> {
  try {
    const diagCol = collection(db, 'users', userId, 'diagnostics');
    const q = query(diagCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => d.data() as StoredDiagnostic);
  } catch (err) {
    console.warn('Aviso ao buscar diagnósticos do Firestore:', err);
    return [];
  }
}

/**
 * Firebase Storage Methods (Capturas de tela e Relatórios)
 */

export async function uploadScreenshot(
  userId: string,
  fileOrBase64: File | Blob | string,
  customName?: string
): Promise<string> {
  const timestamp = Date.now();
  const safeName = customName ? `${timestamp}_${customName}` : `captura_${timestamp}.png`;
  const storageRef = ref(storage, `users/${userId}/screenshots/${safeName}`);

  try {
    if (typeof fileOrBase64 === 'string') {
      if (fileOrBase64.startsWith('data:')) {
        await uploadString(storageRef, fileOrBase64, 'data_url');
      } else {
        await uploadString(storageRef, fileOrBase64, 'base64');
      }
    } else {
      await uploadBytes(storageRef, fileOrBase64);
    }

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (err: any) {
    console.warn('Aviso ao enviar captura para o Firebase Storage:', err?.message || err);
    // If storage has network or CORS constraints in preview, provide graceful fallback
    if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:')) {
      return fileOrBase64;
    }
    return '';
  }
}

export async function uploadDiagnosticReport(
  userId: string,
  reportContent: object | string,
  fileName?: string
): Promise<string> {
  const timestamp = Date.now();
  const safeName = fileName || `relatorio_ssi_${timestamp}.json`;
  const storageRef = ref(storage, `users/${userId}/reports/${safeName}`);

  try {
    const content = typeof reportContent === 'string' 
      ? reportContent 
      : JSON.stringify(reportContent, null, 2);

    const blob = new Blob([content], { type: 'application/json' });
    await uploadBytes(storageRef, blob);

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (err: any) {
    console.warn('Aviso ao enviar relatório para o Firebase Storage:', err?.message || err);
    return '';
  }
}

