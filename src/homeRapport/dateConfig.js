export const getDate = (date) => {
  const theDate = new Date(date);

  // console.log(theDate);

  const dateYear = theDate.getFullYear();
  const dateDay = theDate.getDate();
  const dateMonth = theDate.getMonth();

  let month = "";

  switch (dateMonth) {
    case 0:
      month = "Janvier";
      break;
    case 1:
      month = "Février";
      break;
    case 2:
      month = "Mars";
      break;
    case 3:
      month = "Avril";
      break;
    case 4:
      month = "Mai";
      break;
    case 5:
      month = "Juin";
      break;
    case 6:
      month = "Juillet";
      break;
    case 7:
      month = "Aout";
      break;
    case 8:
      month = "Septembre";
      break;
    case 9:
      month = "Octobre";
      break;
    case 10:
      month = "Novembre";
      break;
    case 11:
      month = "Décembre";
      break;
    default:
      month = "";
  }

  let dateNew = `${dateDay} ${month} ${dateYear}`;
  // console.log(dateDay,dateMonth,dateYear);
  return dateNew;
};
