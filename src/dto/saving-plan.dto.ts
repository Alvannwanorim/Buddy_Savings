import { SavingMethod } from "../enums/saving-method.enum";
import { IsString, MinLength, IsNumber, Min, Max, IsPositive, IsNotEmpty, IsOptional, IsEnum, IsDate, IsDateString} from "class-validator";
import { SavingFrequency } from "../enums/saving-frequency.enums";


export class SavingPlanDto {
    @IsString()
    @MinLength(12)
    title: string;
    
    @IsPositive()
    @IsNotEmpty()
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 5})
    @Min(1000)
    @Max(100000)
    amount: number;

    @IsOptional()
    limit: number;

    @IsOptional()
    isTargeted: boolean;

    @IsOptional()
    @IsEnum(SavingMethod)
    method: SavingMethod;

    @IsOptional()
    @IsEnum(SavingFrequency)
    frequency: SavingFrequency;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;


    @IsNumber({maxDecimalPlaces: 5})
    @Min(1000)
    @Max(100000)
    yearlyTarget: number;

    @IsNumber()
    @Min(1)
    @Max(12)
    duration: number;
    
    @IsOptional()
    isActive: boolean;

}