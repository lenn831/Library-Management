import {Injectable} from '@angular/core';

export type UserRole = 'student' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly currentUser = {
        role: sessionStorage.getItem('role') as UserRole | null,
    };

    login(username: string, password: string): boolean {
        if (username === 'student' && password === 'student123') {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('role', 'student');
            sessionStorage.setItem('studentId', 'STU-001');
            return true;
        }

        return false;
    }

    logout(): void {
        sessionStorage.clear();
        this.currentUser.role = null;
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem('isLoggedIn') === 'true';
    }

    getRole(): UserRole | null {
        return sessionStorage.getItem('role') as UserRole | null;
    }
}