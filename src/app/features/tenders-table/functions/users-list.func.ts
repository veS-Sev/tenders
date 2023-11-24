//получаем список всех участников, которые делали оферы
export const usersList=(data:any)=>{
    let usersSet = new Set();
    data.forEach((item: any) => {
      if (item.participantId != undefined) {
        usersSet .add(item.participantId);
      }
    });
  
    return Array.from(usersSet);

}