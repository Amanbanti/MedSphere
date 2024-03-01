import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { MfaMethod } from '@medsphere/shared';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@medsphere/shared';

export class RegisterUserRequestDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  @MaxLengthCompat(PASSWORD_MAX_LENGTH)
  password!: string;

  @IsString()
  @Length(1, 100)
  firstName!: string;

  @IsString()
  @Length(1, 100)
  lastName!: string;

  @IsUUID()
  organizationId!: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+[1-9]\d{7,14}$/)
  phone?: string;

  @IsBoolean()
  acceptTerms!: boolean;
}

export class LoginRequestDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  @MaxLengthCompat(PASSWORD_MAX_LENGTH)
  password!: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  organizationSlug?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{6}$/)
  mfaCode?: string;

  @IsOptional()
  @IsString()
  @Length(8, 128)
  deviceId?: string;
}

export class RefreshTokenRequestDto {
  @IsString()
  @MinLength(20)
  refreshToken!: string;
}

export class EnrollMfaRequestDto {
  @IsEnum(MfaMethod)
  method!: MfaMethod;
}

export class VerifyMfaRequestDto {
  @IsEnum(MfaMethod)
  method!: MfaMethod;

  @IsString()
  @Length(6, 128)
  code!: string;

  @IsOptional()
  @IsUUID()
  challengeId?: string;
}

export class RequestPasswordResetDto {
  @IsEmail()
  email!: string;
}

export class ConfirmPasswordResetDto {
  @IsString()
  @MinLength(20)
  token!: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  @MaxLengthCompat(PASSWORD_MAX_LENGTH)
  newPassword!: string;
}

export class CreateApiKeyRequestDto {
  @IsString()
  @Length(2, 100)
  name!: string;

  @IsString({ each: true })
  @Length(3, 100, { each: true })
  scopes!: string[];

  @IsOptional()
  @IsString()
  expiresAt?: string;
}

export class RevokeSessionRequestDto {
  @IsString()
  @Length(2, 200)
  reason!: string;
}

function MaxLengthCompat(max: number) {
  return Length(0, max);
}
