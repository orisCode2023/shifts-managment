import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'commander' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password456', role: 'soldier' }];


    findAll() {
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }
    findOneByUsername(name: string) {
        const user = this.users.find(user => user.name === name);
        console.log({ u: user, name })
        return user
    }
    createUser(user: { name: string; email: string; password: string; role: string }) {
        const newId = this.users.length + 1;
        const userWithId = { id: newId, ...user };
        this.users.push(userWithId);
        return userWithId;
    }

    removeUser(id: number) {
        this.users = this.users.filter(user => user.id !== id);

    }
    updateUser(id: number, updatedUser: { name: string; role: string }) {
        const user = this.findOne(+id);
        if (user) {
            user.name = updatedUser.name || user.name;
            user.role = updatedUser.role || user.role;
            return user;
        } else {
            throw new Error('User not found');
        }
    }
}
