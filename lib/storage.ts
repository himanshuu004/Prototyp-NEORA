// localStorage-based data management for frontend prototype

export interface User {
  _id: string;
  clerkId: string;
  email: string;
  name: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: number;
}

export interface Child {
  _id: string;
  userId: string;
  name: string;
  age: number;
  diagnosis: string;
  therapyPlan: string;
  notes?: string;
  createdAt: number;
}

export interface Slot {
  _id: string;
  date: string;
  time: string;
  duration: number;
  status: "available" | "booked" | "blocked";
  createdBy: string;
  createdAt: number;
}

export interface Session {
  _id: string;
  userId: string;
  childId?: string;
  slotId: string;
  therapyType: string;
  concern: string;
  status: "scheduled" | "completed" | "cancelled";
  bookedAt: number;
  sessionDate: string;
  sessionTime: string;
}

export interface Payment {
  _id: string;
  userId: string;
  sessionId?: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentDate: number;
  notes?: string;
}

export interface ProgressNote {
  _id: string;
  sessionId: string;
  childId: string;
  therapistId: string;
  notes: string;
  progress: string;
  date: number;
}

// Helper functions
function getStorageKey(key: string): string {
  return `neora_${key}`;
}

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Users
export const users = {
  getAll(): User[] {
    const data = localStorage.getItem(getStorageKey("users"));
    return data ? JSON.parse(data) : [];
  },

  getById(userId: string): User | null {
    const users = this.getAll();
    return users.find(u => u._id === userId) || null;
  },

  getByClerkId(clerkId: string): User | null {
    const users = this.getAll();
    return users.find(u => u.clerkId === clerkId) || null;
  },

  getByEmail(email: string): User | null {
    const users = this.getAll();
    return users.find(u => u.email === email) || null;
  },

  create(user: Omit<User, "_id" | "createdAt">): User {
    const users = this.getAll();
    const newUser: User = {
      ...user,
      _id: generateId(),
      createdAt: Date.now(),
    };
    users.push(newUser);
    localStorage.setItem(getStorageKey("users"), JSON.stringify(users));
    return newUser;
  },

  update(userId: string, updates: Partial<User>): User | null {
    const users = this.getAll();
    const index = users.findIndex(u => u._id === userId);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(getStorageKey("users"), JSON.stringify(users));
    return users[index];
  },
};

// Children
export const children = {
  getAll(): Child[] {
    const data = localStorage.getItem(getStorageKey("children"));
    return data ? JSON.parse(data) : [];
  },

  getById(childId: string): Child | null {
    const children = this.getAll();
    return children.find(c => c._id === childId) || null;
  },

  getByUser(userId: string): Child[] {
    const children = this.getAll();
    return children.filter(c => c.userId === userId);
  },

  create(child: Omit<Child, "_id" | "createdAt">): Child {
    const children = this.getAll();
    const newChild: Child = {
      ...child,
      _id: generateId(),
      createdAt: Date.now(),
    };
    children.push(newChild);
    localStorage.setItem(getStorageKey("children"), JSON.stringify(children));
    return newChild;
  },

  update(childId: string, updates: Partial<Child>): Child | null {
    const children = this.getAll();
    const index = children.findIndex(c => c._id === childId);
    if (index === -1) return null;
    children[index] = { ...children[index], ...updates };
    localStorage.setItem(getStorageKey("children"), JSON.stringify(children));
    return children[index];
  },
};

// Slots
export const slots = {
  getAll(): Slot[] {
    const data = localStorage.getItem(getStorageKey("slots"));
    return data ? JSON.parse(data) : [];
  },

  getById(slotId: string): Slot | null {
    const slots = this.getAll();
    return slots.find(s => s._id === slotId) || null;
  },

  getByDate(date: string): Slot[] {
    const slots = this.getAll();
    return slots.filter(s => s.date === date);
  },

  getAvailable(date: string): Slot[] {
    const slots = this.getByDate(date);
    return slots.filter(s => s.status === "available");
  },

  create(slot: Omit<Slot, "_id" | "createdAt">): Slot {
    const slots = this.getAll();
    const newSlot: Slot = {
      ...slot,
      _id: generateId(),
      createdAt: Date.now(),
    };
    slots.push(newSlot);
    localStorage.setItem(getStorageKey("slots"), JSON.stringify(slots));
    return newSlot;
  },

  updateStatus(slotId: string, status: Slot["status"]): Slot | null {
    const slots = this.getAll();
    const index = slots.findIndex(s => s._id === slotId);
    if (index === -1) return null;
    slots[index].status = status;
    localStorage.setItem(getStorageKey("slots"), JSON.stringify(slots));
    return slots[index];
  },
};

// Sessions
export const sessions = {
  getAll(): Session[] {
    const data = localStorage.getItem(getStorageKey("sessions"));
    return data ? JSON.parse(data) : [];
  },

  getById(sessionId: string): Session | null {
    const sessions = this.getAll();
    return sessions.find(s => s._id === sessionId) || null;
  },

  getByUser(userId: string): Session[] {
    const sessions = this.getAll();
    return sessions.filter(s => s.userId === userId);
  },

  create(session: Omit<Session, "_id" | "bookedAt">): Session {
    const sessions = this.getAll();
    const newSession: Session = {
      ...session,
      _id: generateId(),
      bookedAt: Date.now(),
    };
    sessions.push(newSession);
    // Update slot status to booked
    slots.updateStatus(session.slotId, "booked");
    localStorage.setItem(getStorageKey("sessions"), JSON.stringify(sessions));
    return newSession;
  },

  updateStatus(sessionId: string, status: Session["status"]): Session | null {
    const sessions = this.getAll();
    const index = sessions.findIndex(s => s._id === sessionId);
    if (index === -1) return null;
    sessions[index].status = status;
    localStorage.setItem(getStorageKey("sessions"), JSON.stringify(sessions));
    return sessions[index];
  },
};

// Payments
export const payments = {
  getAll(): Payment[] {
    const data = localStorage.getItem(getStorageKey("payments"));
    return data ? JSON.parse(data) : [];
  },

  getById(paymentId: string): Payment | null {
    const payments = this.getAll();
    return payments.find(p => p._id === paymentId) || null;
  },

  getByUser(userId: string): Payment[] {
    const payments = this.getAll();
    return payments.filter(p => p.userId === userId);
  },

  create(payment: Omit<Payment, "_id">): Payment {
    const payments = this.getAll();
    const newPayment: Payment = {
      ...payment,
      _id: generateId(),
    };
    payments.push(newPayment);
    localStorage.setItem(getStorageKey("payments"), JSON.stringify(payments));
    return newPayment;
  },
};

// Progress Notes
export const progressNotes = {
  getAll(): ProgressNote[] {
    const data = localStorage.getItem(getStorageKey("progressNotes"));
    return data ? JSON.parse(data) : [];
  },

  getById(noteId: string): ProgressNote | null {
    const notes = this.getAll();
    return notes.find(n => n._id === noteId) || null;
  },

  getBySession(sessionId: string): ProgressNote[] {
    const notes = this.getAll();
    return notes.filter(n => n.sessionId === sessionId);
  },

  getByChild(childId: string): ProgressNote[] {
    const notes = this.getAll();
    return notes.filter(n => n.childId === childId);
  },

  create(note: Omit<ProgressNote, "_id">): ProgressNote {
    const notes = this.getAll();
    const newNote: ProgressNote = {
      ...note,
      _id: generateId(),
    };
    notes.push(newNote);
    localStorage.setItem(getStorageKey("progressNotes"), JSON.stringify(notes));
    return newNote;
  },
};

