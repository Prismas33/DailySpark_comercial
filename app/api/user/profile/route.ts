import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb, adminStorage } from '@/lib/firebaseServer';

export async function POST(req: Request) {
  try {
    if (!adminAuth || !adminDb) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const body = await req.json();
    const { action, displayName, photoURL } = body;

    if (action === 'updateProfile') {
      // Update Auth profile
      await adminAuth.updateUser(uid, {
        displayName: displayName || undefined,
        photoURL: photoURL || undefined,
      });

      // Update Firestore profile
      await adminDb.collection('users').doc(uid).set(
        {
          profile: {
            displayName: displayName || null,
            photoURL: photoURL || null,
            lastUpdated: new Date().toISOString(),
          },
        },
        { merge: true }
      );

      return NextResponse.json({ success: true, message: 'Profile updated' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    if (!adminAuth || !adminDb) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const userDoc = await adminDb.collection('users').doc(uid).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    return NextResponse.json({
      profile: userData?.profile || null,
      settings: userData?.settings || null,
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
