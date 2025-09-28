import { PartialType } from '@nestjs/mapped-types';
import { CreateFootballerDto } from './create-Footballer.dto';
export class UpdateFootballerDto extends PartialType(CreateFootballerDto) {}
