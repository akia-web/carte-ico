import { FeedBackDto } from '@/app/interfaces/feed-back.dto';

export function bigintReplacerAllForUser(objet: any) {
  const newUser = {};
  Object.entries(objet).forEach(([key, value]) => {
    if (typeof value === 'bigint') {
      const bigintToString: string = value.toString();
      value = Number(bigintToString);
    }
    // @ts-ignore
    newUser[key] = value;
  });

  Object.entries(objet.user_stat[0]).forEach(([key, value]) => {
    if (typeof value === 'bigint') {
      const bigintToString: string = value.toString();
      value = Number(bigintToString);
    }
    // @ts-ignore
    newUser.user_stat[0][key] = value;
  });

  return newUser;
}

export function bigintReplacerAll(objet: any) : any {
  const newObject = {};
  Object.entries(objet).forEach(([key, value]) => {
    if (typeof value === 'bigint') {
      const bigintToString: string = value.toString();
      value = Number(bigintToString);
    }
    // @ts-ignore
    newObject[key] = value;
  });
  return newObject;
}

export function bigIntReplacerForOne(value: bigint){
  return value.toString()
}