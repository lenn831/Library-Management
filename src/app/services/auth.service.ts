import {Injectable} from '@angular/core';

export type UserRole = 'student' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly currentUser = {
        role: sessionStorage.getItem('role') as UserRole | null,
    };

    login(username: string, password: string): boolean {
        const role = 
        username === 'student' && password === 'student123' ? 'student' :
        username === 'admin ' && password === 'admin123' ? 'admin' :
        null;

        if (!role) return false;

        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('role', role);

        if (role === 'student') {
            sessionStorage.setItem('studentId', 'STU-001');
        } else {
            sessionStorage.removeItem('studentId');
        }

        return true;
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