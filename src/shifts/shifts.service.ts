import { Injectable } from '@nestjs/common';

@Injectable()
export class ShiftsService {
    private shifts = [
        { id: 1, name: 'Morning Shift', startTime: '08:00', endTime: '16:00', location: 'Base A' },
        { id: 2, name: 'Evening Shift', startTime: '16:00', endTime: '00:00', location: 'Base B' },
    ]; 

    findAll() {
        return this.shifts;
    }
    findOne(id: number) {
        return this.shifts.find(shift => shift.id === id);
    }

    createShift(shift: { name: string; startTime: string; endTime: string; location: string }) {
        const newId = this.shifts.length + 1;
        const shiftWithId = { id: newId, ...shift };
        this.shifts.push(shiftWithId);
        return shiftWithId;
    }

    removeShift(id: number) {
        this.shifts = this.shifts.filter(shift => shift.id !== id);

    }
    updateShift(id: number, updatedShift: { name: string; startTime: string; endTime: string; location: string  }) {
        const shift = this.findOne(+id);
        if (shift) {
            shift.name = updatedShift.name || shift.name;
            shift.startTime = updatedShift.startTime || shift.startTime;
            shift.endTime = updatedShift.endTime || shift.endTime;
            shift.location = updatedShift.location || shift.location;
            return shift;
        } else {
            throw new Error('User not found');
        }
    }

}