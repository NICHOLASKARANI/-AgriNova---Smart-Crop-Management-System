export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'moderator';
  verified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  subscription: 'free' | 'premium';
  profilePicture?: string;
  bio?: string;
  phone?: string;
  location?: string;
}

// In-memory storage (replace with database in production)
class UserDatabase {
  private users: User[] = [];
  private static instance: UserDatabase;

  private constructor() {
    // Initialize with empty users - no demo accounts
  }

  static getInstance(): UserDatabase {
    if (!UserDatabase.instance) {
      UserDatabase.instance = new UserDatabase();
    }
    return UserDatabase.instance;
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  findById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  update(id: string, data: Partial<User>): User | null {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...data, updatedAt: new Date() };
      return this.users[index];
    }
    return null;
  }

  getAll(): User[] {
    return this.users;
  }
}

export const userDB = UserDatabase.getInstance();
