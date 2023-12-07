import { ethers } from "ethers";

/**  Displays the first and last 4 characters of a given address */
export const shortAdd = (address) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

/**  Displays the first and last 10 characters of a given address */
export const longAdd = (address) => {
  return address.slice(0, 10) + "..." + address.slice(-10);
};

export const formatNumberWithCommas = (num) => {
  // Convert to string to handle the decimal part separately
  const numString = ethers.utils.formatUnits(num, 18).toString();

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = numString.split(".");

  // Format the integer part with commas
  const formattedInteger = Number(integerPart).toLocaleString();

  // If there's a decimal part, include it in the final result
  const formattedNumber = decimalPart
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;

  return formattedNumber;
};

export const fromBn = (num) => {
  return Number(ethers.utils.formatUnits(num, 18));
};

export const fromBnPrecise = (num, decimal) => {
  const val = Number(ethers.utils.formatUnits(num, 18));

  const number =
    Math.trunc(val * Math.pow(10, decimal)) / Math.pow(10, decimal);

  return Number(number);
};

export const fromBn18 = (num) => {
  return Number(ethers.utils.formatUnits(num, 0)).toFixed(0);
};

export const toBn = (num) => {
  return ethers.utils.parseEther(num.toString());
};
