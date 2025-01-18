export function bigintReplacerAllForUser(objet: any) {
  const newUser = {};
  Object.entries(objet).forEach(([cle, value]) => {
    if (typeof value === 'bigint') {
      const bigintToString: string = value.toString();
      value = Number(bigintToString);
    }
    // @ts-ignore
    newUser[cle] = value;
  });

  Object.entries(objet.user_stat[0]).forEach(([cle, value]) => {
    if (typeof value === 'bigint') {
      const bigintToString: string = value.toString();
      value = Number(bigintToString);
    }
    // @ts-ignore
    newUser.user_stat[0][cle] = value;
  });

  return newUser;
}