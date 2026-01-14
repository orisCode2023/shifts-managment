import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignmentsService {
    private shifts = [
        { id: 1, userId: 1, shiftId: 101 },
        { id: 2, userId: 2, shiftId: 102 }]
        

    findAll() {
        return this.shifts;
    }

    findOne(id: number) {
        return this.shifts.find(shift => shift.id === id);
    }

    createShift(shift: { userId: number; shiftId: number }) {
        const newId = this.shifts.length + 1;
        const shiftWithId = { id: newId, ...shift };
        this.shifts.push(shiftWithId);
        return shiftWithId;
    }

    removeShift(id: number) {
        this.shifts = this.shifts.filter(shift => shift.id !== id);

    }
    updateShift(id: number, updatedShift: { userId: number; shiftId: number  }) {
        const shift = this.findOne(+id);
        if (shift) {
            shift.shiftId = updatedShift.shiftId || shift.shiftId;
            shift.userId = updatedShift.userId || shift.userId;
            return shift;
        } else {
            throw new Error('User not found');
        }
    }
}
