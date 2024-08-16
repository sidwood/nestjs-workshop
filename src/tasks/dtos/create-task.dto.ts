import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'Key cannot exceed $constraint1 characters' })
  readonly title: string | undefined

  @IsBoolean()
  readonly iDone: boolean = false
}
