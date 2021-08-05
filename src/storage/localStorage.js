export const getList = () => JSON.parse(localStorage.getItem('planList')) || [];

export const updateList = (planList) => {
  localStorage.setItem('planList', JSON.stringify(planList));
}
