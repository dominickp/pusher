import { Nest } from './nest/nest';
import { Job } from './job/job';
export declare class Tunnel {
    name: string;
    watching: Nest[];
    constructor(theName: string);
    move(distanceInMeters?: number): void;
    watch(nest: Nest): void;
    arrive(job: Job, nest: Nest): void;
    run(): void;
}