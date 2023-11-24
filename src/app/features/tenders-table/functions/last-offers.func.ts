
//функция для отбора последнего по дате предложения для одного участника
export const lastOffers = (data: [],usersList:string[]) => {
 //выбираем все предложения одного участника из всех
    const offersByUser = usersList.map((item) =>
    data.reduce((newArr: any[], offer: any) => {
      if (item === offer.participantId) {
        newArr.push(offer);
      }
      return newArr;
    }, [])
  );
  // получили массив с двумя массивами отсортированными по айдишнику участника
  const sortOffer = offersByUser.map((arr) => {
    let newArr= arr.reduce((a, b) => {
      return a.offerDate > b.offerDate ? a : b;
    },[]);
    return newArr
  });
  return sortOffer
};