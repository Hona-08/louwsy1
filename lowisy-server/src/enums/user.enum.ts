export enum UserStatus {
  Active = 1,
  Pending = 2,
  Blocked = 3,
  Deleted = 4,
  EmailVerified = 5,
}

export enum UserType {
  INDIVIDIUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
}

export enum UserFetch {
  UserProfile = 'USER_PROFILE',
  Company = 'COMPANY',
}
