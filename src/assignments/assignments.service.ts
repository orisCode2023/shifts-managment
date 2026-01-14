import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignmentsService {
    private assignments = [
        { id: 1, userId: 1, shiftId: 101 },
        { id: 2, userId: 2, shiftId: 102 }]
        

    findAll() {
        return this.assignments;
    }

    findOne(id: number) {
        return this.assignments.find(shift => shift.id === id);
    }

    createShift(shift: { userId: number; shiftId: number }) {
        const newId = this.assignments.length + 1;
        const assignmentWithId = { id: newId, ...shift };
        this.assignments.push(assignmentWithId);
        return assignmentWithId;
    }

    removeShift(id: number) {
        this.assignments = this.assignments.filter(assignment => assignment.id !== id);

    }
    updateShift(id: number, updatedAssignment: { userId: number; shiftId: number  }) {
        const assignment = this.findOne(+id);
        if (assignment) {
            assignment.shiftId = updatedAssignment.shiftId || assignment.shiftId;
            assignment.userId = updatedAssignment.userId || assignment.userId;
            return assignment;
        } else {
            throw new Error('User not found');
        }
    }
}
