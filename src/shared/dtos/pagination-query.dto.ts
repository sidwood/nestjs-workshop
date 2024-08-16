import { IsInt, IsOptional, Max, Min } from 'class-validator'

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Limit must be greater than or equal to $constraint1' })
  @Max(5000, { message: 'Limit must be less than or equal to $constraint1' })
  readonly limit: number = 50

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Offset must be greater than or equal to $constraint1' })
  readonly offset: number = 0
}
