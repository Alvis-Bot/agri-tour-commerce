import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App, cert, getApps, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';
import { getMessaging, Messaging } from 'firebase-admin/messaging';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class FirebaseService {
  public readonly app: App;
  public readonly auth: Auth;
  public readonly firestore: Firestore;
  public readonly storage: Storage;
  public readonly messaging: Messaging;

  constructor(private readonly configService: ConfigService) {
    if (!this.app && getApps().length === 0) {
      this.app = initializeApp({
        credential: cert(
          JSON.parse(
            readFileSync(
              join(__dirname, '..', '..', 'serviceAccountKey.json'),
              'utf8',
            ),
          ),
        ),
      });
    } else {
      this.app = getApps()[0];
    }

    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this.storage = getStorage(this.app);
    this.messaging = getMessaging(this.app);
  }
}
