const number = /^(\+88)?01[3-8]\d{8}$/;
const texts = /^[a-z\.-\s]{2}[a-z\t-\s]*$/i;
const schoolText = /^.{5}/i;
const summary = /^.{50}/i;
const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const date = /^\d{4}(\-|\/)\d\d?(\-|\/)\d\d?$/;
const degree = /^[^(\s-\t)]./;
const monthdate = /^[a-z]\s[\d]{4}$/i;
const password =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const description = /^.{10}/;
export const verifyDescription = text => {
  const test = description.test(text);
  return test;
};
export const verifyNumber = text => {
  const test = number.test(text);
  return test;
};

export const verifyName = text => {
  const test = texts.test(text);
  return test;
};

export const verifySchool = text => {
  const test = schoolText.test(text);
  return test;
};

export const verifySummary = text => {
  const test = summary.test(text);
  return test;
};

export const verifyEmail = text => {
  const test = email.test(text);
  return test;
};

export const verifyDate = text => {
  const test = date.test(text);
  return test;
};
export const verifyDegree = text => {
  const test = degree.test(text);
  return test;
};
export const verifyMonthDate = text => {
  return monthdate.test(text);
};
export const verifyPassword = text => {
  return password.test(text);
};
