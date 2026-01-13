import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John Doe', roll: 'commander' },
         { id: 2, name: 'Jane Smith', roll: 'soldier' }];
        

    findAll() {
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }
    createUser(user: {name: string; roll: string }) {
        const newId = this.users.length + 1;
        const userWithId = { id: newId, ...user };
        this.users.push(userWithId);
        return userWithId;
    }

    removeUser(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        
    }
    updateUser(id: number, updatedUser: { name: string; roll: string }) {
        const user = this.findOne(+id);
        if (user) {
            user.name = updatedUser.name || user.name;
            user.roll = updatedUser.roll || user.roll;
            return user;
        } else {
            throw new Error('User not found');
        }
    }
}
