import { IsString } from "class-validator";


export class createApplyDTO {
    @IsString()
    projectId: string;

    @IsString()
    userId: string;

    @IsString()
    offerId: string;

    @IsString()
    message: string;
}