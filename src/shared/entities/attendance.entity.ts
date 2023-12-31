import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { AttendanceStatus } from '@psycare/enums';
import { CalendarHour } from '@psycare/enums';
import { Professional } from './professional.entity';
import { User } from './user.entity';
import { Rating } from './rating.entity';
import { MedicalRecord } from './medical-record.entity';
import { FollowUp } from './follow-up.entity';
import { Meeting } from './meeting.entity';
import { Message } from './message.entity';

@Entity('attendance')
@Unique('professional_user_index', ['professionalId', 'userId'])
@Unique('professional_calendar_hour_index', ['professionalId', 'calendarHour'])
@Unique('user_calendar_hour_index', ['userId', 'calendarHour'])
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: AttendanceStatus,
    })
    status: AttendanceStatus;

    @Column({
        type: 'enum',
        enum: CalendarHour,
    })
    calendarHour: CalendarHour;

    @ManyToOne(() => Professional, { nullable: false })
    professional: Professional;

    @Column()
    professionalId: number;

    @ManyToOne(() => User, { nullable: false })
    user: User;

    @Column()
    userId: number;

    @OneToOne(() => Rating, (rating) => rating.attendance, { nullable: true })
    rating?: Rating;

    @OneToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.attendance, { nullable: true })
    medicalRecord?: MedicalRecord;

    @OneToMany(() => FollowUp, (followUp) => followUp.attendance)
    followUps?: FollowUp[];

    @OneToMany(() => Meeting, (meeting) => meeting.attendance)
    meetings?: Meeting[];

    @OneToMany(() => Message, (message) => message.attendance)
    messages?: Message[];

    @CreateDateColumn()
    createdAt: Date;

    constructor(status: AttendanceStatus, calendarHour: CalendarHour, professionalId: number, userId: number) {
        this.status = status;
        this.calendarHour = calendarHour;
        this.professionalId = professionalId;
        this.userId = userId;
    }
}
