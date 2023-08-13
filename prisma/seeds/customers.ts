import { Prisma } from '@prisma/client';

export const customers: Prisma.CustomerUpsertArgs['create'][] = [
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd3',
    email: 'user@gmail.com',
    password: '$argon2id$v=19$m=65536,t=3,p=4$8B4UTPJIn7lN3SoE77yQNw$EUKPfy25C1vFxuRlkSMDv9SOlkZ0bACaNQOEdpSqa3c', // hashed 'random-password'
    isVerified: true,
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd4',
    email: 'user2@gmail.com',
    password: '$argon2id$v=19$m=65536,t=3,p=4$8B4UTPJIn7lN3SoE77yQNw$EUKPfy25C1vFxuRlkSMDv9SOlkZ0bACaNQOEdpSqa3c', // hashed 'random-password'
    activationCode: '$argon2id$v=19$m=65536,t=3,p=4$2NWjZHrqyv/NUZJV1C9quw$QZ+fME9vTSTxsrVQuIBnWB4ZcTl+XfdWx3LXUpoY3lk', // hashed '5on8scjri0i'
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd5',
    email: 'admin@gmail.com',
    password: '$argon2id$v=19$m=65536,t=3,p=4$8B4UTPJIn7lN3SoE77yQNw$EUKPfy25C1vFxuRlkSMDv9SOlkZ0bACaNQOEdpSqa3c', // hashed 'random-password'
    role: 'ADMIN',
    isVerified: true,
  },
];
