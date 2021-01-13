export default  function (stamp) {
  const date = new Date(+(stamp + '000'));

  const year = date.getFullYear();
  const month = ('0' + date.getMonth()+1).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${day}-${month}-${year}`
}
